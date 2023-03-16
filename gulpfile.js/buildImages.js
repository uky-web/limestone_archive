const gulp = require('gulp'),
plumber = require('gulp-plumber');
const {paths, plumber_error} = require('./constants');

const buildImages = function(){
    return gulp.src(paths.images)
    .pipe(plumber({
      errorHandler: plumber_error
    }))
    .pipe(gulp.dest(paths.dist_images));
}

module.exports = buildImages;