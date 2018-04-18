var interactive = false;

var 
	argv = require('yargs').argv,
	async = require('async'),
	autoprefixer = require('autoprefixer'),
	babel = require('gulp-babel');
	coffee = require('gulp-coffee'),
	colors = require('ansi-colors'),
	consolidate = require('gulp-consolidate'),
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
	svgsprite = require('gulp-svg-sprite'),
	iconfont = require('gulp-iconfont');
  
// within the container,
//   /app/assets is the source parent
//   /app/dist is the output parent

// bower_path is used as a prefix in other paths
var bower_path = 'assets/bower_components';

// used by the font generator
var runTimestamp = Math.round(Date.now() / 1000);


var paths = {
	sass: ['assets/scss/**/*.scss'],
	coffee: ['assets/coffee/*.coffee'],
	js: ['assets/js/**/*.js'],
	images: ['assets/images/**/*'],
	fonts: ['assets/fonts/**/*'],
	svgstore: ['assets/svgstoredocker /**/*.svg'],
	font_svg: ['assets/font-svg/**/*.svg'],
	font_sass_tpl: ['assets/font-svg/_iconfont.scss'],
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
	dist_svg: 'dist/images/sprites/',
	dist_images: 'dist/images',
	dist_fonts: 'dist/fonts',
};

// Error reporter for plumber.
var plumber_error = function (err) {
	if (!interactive) {
		throw err;
	}
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

// Copy images from src to PL source destination
// (after optimizing them, if enabled)
gulp.task('fonts', function () {
	return gulp.src(paths.fonts)
		.pipe(plumber({ errorHandler: plumber_error }))
		.pipe(gulp.dest(paths.dist_fonts));
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

gulp.task('iconfont', function (done) {
	var iconStream = gulp.src(paths.font_svg)
		.pipe(plumber())
		.pipe(iconfont({
			fontName: 'icons', // required
			formats: ['ttf', 'eot', 'woff', 'woff2'], // default, 'woff2' and 'svg' are available
			timestamp: runTimestamp, // recommended to get consistent builds when watching files
			normalize: true,
			fontHeight: 1001
		}));

	async.parallel([
		function handleGlyphs (cb) {
			iconStream.on('glyphs', function(glyphs, options){
				gulp.src(paths.font_sass_tpl)
					.pipe(plumber())
					.pipe(consolidate('lodash', {
						glyphs: glyphs,
						fontName: 'icons',
						fontPath: '../fonts/',
						className: 'ic'
					}))
					.pipe(gulp.dest('assets/scss/includes/'))
			});
		},
		function handleFonts(cb) {
			iconStream.pipe(gulp.dest(paths.dist_fonts))
			.on('finish', cb);
		}
	], done);

	return iconStream;
});


// Build the SVG spritesheet. This pulls everything
// out of the svgstore directory, combines them into
// one SVG element with the filename as an ID, then
// stores these in the images/sprites directory 
// as svg-sprite-custom-symbol.svg.
gulp.task('svgstore', function () {
	svgsprite_config = {
		"shape": {
			"transform": [{
				"svgo": {
					"plugins": [{
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
			}]
		},
		"svg": {
			"xmlDeclaration": false,
			"doctypeDeclaration": false
		},
		"mode": {
			"symbol": {
				"dest": ".",
				"sprite": 'standard_icons.svg'
			}
		}
	};
	return gulp.src(paths.svgstore)
		.pipe(plumber())
		.pipe(svgsprite(svgsprite_config))
		.pipe(gulp.dest(paths.dist_svg))
});

// build-all builds everything in one go.
gulp.task('build-all', ['styles', 'jquery', 'vendorscripts', 'js', 'coffee', 'images', 'iconfont']);

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

	sanewatch(paths.fonts, watcherOptions,
		function () {
			gulp.start('fonts');
		}
	);
	
	sanewatch(paths.font_sass_tpl.concat(paths.font_svg), watcherOptions,
		function () {
			gulp.start('iconfont');
		}
	);
});

// Default build task
gulp.task('default', function() {
	gulp.start('watcher');
});
