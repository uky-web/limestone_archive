const argv = require('yargs').argv,
autoprefixer = require('autoprefixer'),
eyeglass = require('eyeglass'),
flexbugs = require('postcss-flexbugs-fixes'),
sassLint = require('gulp-sass-lint'),
gulp = require('gulp'),
gulpif = require('gulp-if'),
lodash = require('lodash'),
{ series, parallel, src, dest } = require('gulp'),
{ paths, plumber_error, sassIncludePaths } = require('./constants'),
plumber = require('gulp-plumber'),
postcss = require('gulp-postcss'),
// sass = require('gulp-dart-sass'),
sass = require("gulp-sass")(require("sass-embedded")),
sourcemaps = require('gulp-sourcemaps');

var sassOptions = {
  // outputStyle: 'nested',
  eyeglass: {

  }
};
const sassLintOptions = {
    options: {
      configFile: '.sass-lint.yml',
      cacheConfig: false,
      outputFile:'sass-lint-output.txt'
    }
  };

  const buildCSS = function(cb) {
    return src(paths.sass)
    // .pipe(sassLint(sassLintOptions))
    // .pipe(sassLint.format())
    // .pipe(sassLint.failOnError())
    .pipe(plumber({
      errorHandler: plumber_error
    }))

    // If not in production mode, generate a sourcemap
    .pipe(gulpif(!argv.production, sourcemaps.init()))
    // .pipe(sass(eyeglass(sassOptions)))
    .pipe(sass({includePaths: sassIncludePaths}))
    .pipe(postcss([
      autoprefixer(['last 2 versions', '> 1%']),
      flexbugs()
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist_css));

  }

  module.exports = buildCSS;