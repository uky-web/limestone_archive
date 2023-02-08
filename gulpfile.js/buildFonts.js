const gulp = require('gulp'),
plumber = require('gulp-plumber');

const {paths, plumber_error} = require('./constants');

const buildFonts = function() {
    return gulp.src(paths.fonts)
      .pipe(plumber({
        errorHandler: plumber_error
      }))
      .pipe(gulp.dest(paths.dist_fonts));
  };

module.exports = buildFonts;