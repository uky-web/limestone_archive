const { default: EyeglassModules } = require('eyeglass/lib/modules/EyeglassModules');
const
babel = require('gulp-babel'),
eslint = require('gulp-eslint'),
gulp = require('gulp'),
plumber = require('gulp-plumber'),
sourcemaps = require('gulp-sourcemaps');

const {paths, plumber_error} = require('./constants');

const buildJS = function() {
    var babelOptions = {
      presets: [
        ['env', {
          'targets': {
            'browsers': ['> 2% in US', 'safari >= 7']
          }
        }]
      ]
    };
  
    var esLintOptions = {
      options: {
        configFile: '.eslintrc.yml',
        cacheConfig: false
      }
    };
  
    return gulp.src(paths.js)
      .pipe(plumber({
        errorHandler: plumber_error
      }))
      .pipe(eslint(esLintOptions))
      .pipe(eslint.format())
      .pipe(sourcemaps.init())
      .pipe(babel(babelOptions))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.dist_js));
  };
  
  module.exports = buildJS;