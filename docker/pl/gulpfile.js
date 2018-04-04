/*
  PL watch / regenerate
*/

var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	exec = require('child_process').exec,
	sanewatch = require('gulp-sane-watch'),
	path = require('path');

var reload_path = [
                    'pl/source/**/*.twig',
                    'pl/source/**/*.json',
                    'pl/source/**/*.php',
                    'pl/public/images/**/*',
                    'pl/public/**/*.svg',
                    'pl/public/css/*.css',
                    'pl/public/js/*.js',
                  ];
var stream_path = [];

// Rebuild patternlab. This makes use of node's exec function instead of any
// of the gulp-specific solutions because it runs precisely once and does
// not depend on any vinyl objects.
var rebuild_pl = function(cb) {
	exec('php pl/core/console --generate',function(err,stdout,stderr) {
    if (stdout) {
		    console.log( stdout );
    }
    if (stderr) {
		    console.log( stderr );
    }
		if (cb) {
			cb();
		}
	});
};

// Target just the patterns.
gulp.task('build', function() {
	rebuild_pl();
});

gulp.task('reload', function() {
	rebuild_pl(function() {
		browserSync.reload();
	});
});

// all the watchy stuff
gulp.task('watch', ['build'], function() {

  browserSync.init({
    open: false,
		server: {
			baseDir: "./pl/public"
		}
	});

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
	var watcherOptions = { debounce:900 };

	sanewatch(reload_path, watcherOptions,
		function() {
			gulp.start('reload');
		}
	);

  sanewatch(stream_path, watcherOptions,
		function(f, p, stat) {
			var fn = './pl/public/' + path.basename(p) + '/' + f;
      return gulp.src(fn)
        .pipe(browserSync.stream());
    }
	);
});

// Default build task
gulp.task('default', function() {
	gulp.start('watch');
});
