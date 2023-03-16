const gulp = require('gulp'),
{paths} = require('./constants');

const buildXML = function() {
    return gulp.src(paths.xml)
      .pipe(gulp.dest(paths.dist_xml));
  };


  module.exports = buildXML;