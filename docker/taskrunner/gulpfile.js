var interactive = false;

var 
	argv = require('yargs').argv,
	autoprefixer = require('autoprefixer'),
	babel = require('gulp-babel');
	coffee = require('gulp-coffee'),
	colors = require('ansi-colors'),
	eyeglass = require('eyeglass'),
	exec = require('child_process').exec,
	flexbugs = require('postcss-flexbugs-fixes'),
	gulp = require('gulp'),
	gulpif = require('gulp-if'),
	log = require('fancy-log'),
	modernizr = require('gulp-modernizr'),
	plumber = require('gulp-plumber'),
	postcss = require('gulp-postcss'),
	sanewatch = require('gulp-sane-watch'),
	sass = require('gulp-sass'),
	save = require('gulp-save'),
	sourcemaps = require('gulp-sourcemaps'),
	svgmin = require('gulp-svgmin'),
	svgsprite = require('gulp-svg-sprite');
  
// within the container,
//   /app/assets is the source parent
//   /app/dist is the output parent

// bower_path is used as a prefix in other paths
var bower_path = 'assets/bower_components';

var paths = {
	sass: ['assets/scss/**/*.scss'],
	coffee: ['assets/coffee/*.coffee'],
	js: ['assets/js/**/*.js'],
	images: ['assets/images/**/*'],
	svgstore: ['assets/svg/**/*.svg'],
	jquery: bower_path + '/jquery/dist/jquery.min.js',
	vendorscripts: [
		// scripts to make available from bower
		// will be dropped directly into dist/js
		bower_path + '/jquery/dist/jquery.js',
		bower_path + '/jquery.fitvids/jquery.fitvids.js',
		bower_path + '/slick-carousel/slick/slick.js',
		bower_path + '/magnific-popup/dist/jquery.magnific-popup.js',
	],
	dist_css: 'dist/css',
	dist_js: 'dist/js',
	dist_svg: 'dist/sprites',
	dist_images: 'dist/images',
};

// Error reporter for plumber.
var plumber_error = function (err) {
	if (!interactive) {
		throw err;
	}
	log( "hi ");
	log( colors.red(err) );
	this.emit('end');
};

// application and third-party SASS -> CSS
gulp.task('styles', function() {
	var sassOptions = {
		outputStyle : 'nested',
		eyeglass: {

		}
	}

	return gulp.src( paths.sass )
		.pipe( plumber({ errorHandler: plumber_error }) )

		// If not in production mode, generate a sourcemap
		.pipe( gulpif( !argv.production, sourcemaps.init() ) )
		.pipe( sass(eyeglass(sassOptions)) )
		.pipe( postcss([ 
			autoprefixer( [ 'last 2 versions', '> 1%' ] ),
			flexbugs()
		]) )
		.pipe( sourcemaps.write('.') )

		// Destination for the processed CSS file and sourcemap
		// cache it so as not to trigger downstream watchers
		.pipe( save('css') )

		// Script to configure modernizr based on flags
		// that are actually used in the stylesheets
		.pipe( modernizr( 'modernizr-custom.js',{
			'options' : [
				'setClasses',
				"addTest",
				"html5printshiv",
				"testProp",
				"fnBind"
			]
		}) )
		// Destinations for the custom modernizr
		.pipe( gulp.dest( paths.dist_js ) )
		// and dump out the original css
		.pipe( save.restore('css'))
		.pipe( gulp.dest( paths.dist_css ) )
});

// Copy images from src to PL source destination
// (after optimizing them, if enabled)
gulp.task('images', function() {
	return gulp.src( paths.images )
		.pipe(plumber({ errorHandler: plumber_error }) )
		.pipe( gulp.dest( paths.dist_images ));
});

// just copy over jquery
// already injected in drupal by jquery_update
gulp.task('jquery', function() {
	return gulp.src( paths.jquery )
		.pipe(plumber({ errorHandler: plumber_error }) )
		.pipe( gulp.dest( paths.dist_js ) );
});

// application third-party JS -> combined JS
gulp.task('vendorscripts', function() {

	return gulp.src( paths.vendorscripts )
		.pipe( gulp.dest( paths.dist_js ) );
});

// Convert coffeescript to JavaScript and put it in the destination
// JS folder
gulp.task('coffee', function() {
	return gulp.src( paths.coffee )
		.pipe(plumber({ errorHandler: plumber_error }) )
		.pipe( coffee() )
		.pipe( gulp.dest( paths.dist_js ) );
});

// Copy javascript files over. These are for JS files not
// handled through bower or similar.
gulp.task('js',function() {
	return gulp.src(paths.js)
		.pipe( gulp.dest( paths.dist_js ));
});

// Build the SVG spritesheet. This pulls everything
// out of the svgstore directory, combines them into
// one SVG element with the filename as an ID, then
// injects the result into a Twig macro definition.
// That macro is then called in a strategically
// selected template to ensure that the svgstore
// content is injected into the page template.
gulp.task('svgstore', function () {
	function fileContents(filePath, file) {
		return file.contents.toString();
	}
	var svgsprite_config = {
		"shape": {
			"transform": [
				{
					"svgo": {
						"plugins": [
							{
								"removeTitle": true
							},
							{
								"removeUnknownsAndDefaults": false
							},
							{
								"cleanupIDs": false
							},
							{
								"cleanupNumericValues": false
							}
						]
					}
				}
			]
		},
		"svg": {
			"xmlDeclaration": false,
			"doctypeDeclaration": false,
			"transform": [
				function(svg) {
					var DOMParser = require('xmldom').DOMParser;
					var XMLSerializer = require('xmldom').XMLSerializer;
					var doc = new DOMParser().parseFromString(svg);
					var paths = doc.getElementsByTagName('path');
					for (var i = 0; i < paths.length; i++) {
						paths[i].setAttribute('fill', 'currentColor');
					}
					return new XMLSerializer().serializeToString(doc);
				}
			]
		},
		"mode": {
			"inline": true,
			"symbol": {
				"dest": '.',
				"sprite": 'icons.svg'
			}
		}
	};
	return gulp.src(paths.svgstore)
		.pipe(plumber({ errorHandler: plumber_error }))
		.pipe(svgsprite(svgsprite_config))
		.pipe(gulp.dest(paths.dist_svg))
});


// build-all builds everything in one go.
gulp.task('build-all', ['styles', 'jquery', 'vendorscripts','svgstore', 'js', 'coffee', 'images']);

// all the watchy stuff
gulp.task('watcher', ['build-all'], function() {
	
	// handle errors gracefully
	interactive = true;

	// sane is a more configurable watcher than gulp watch.
	// You can also have it use the more friendly OSX file
	// watcher "watchman", but that apparently has to be
	// installed by hand instead of through a dependency
	// manager.
	//
	// Installation instructions for Watchman:
	// https://facebook.github.io/watchman/docs/install.html
	//
	// Usage for gulp-sane-watch:
	// https://www.npmjs.com/package/gulp-sane-watch

	//var watcherOptions = { debounce:300,watchman:true };
	var watcherOptions = { debounce:300, watchman:false };

	sanewatch(paths.sass, watcherOptions,
		function() {
			gulp.start('styles');
		}
	);

	sanewatch(paths.coffee, watcherOptions,
		function() {
			gulp.start('coffee');
		}
	);

	sanewatch(paths.js, watcherOptions,
		function() {
			gulp.start('js');
		}
	);

	sanewatch(paths.images, watcherOptions,
		function() {
			gulp.start('images');
		}
	);
});

// Default build task
gulp.task('default', function() {
	gulp.start('watcher');
});
