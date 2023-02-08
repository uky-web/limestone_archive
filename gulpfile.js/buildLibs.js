const gulp = require('gulp'),
{paths} = require('./constants');

const buildLibs = function() {
    return gulp.src(paths.lib)
      .pipe(gulp.dest(paths.dist_lib));
  };


  module.exports = buildLibs;