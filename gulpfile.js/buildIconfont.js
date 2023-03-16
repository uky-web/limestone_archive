
const   
async = require('async'),
consolidate = require('gulp-consolidate'),
gulp = require('gulp'),
iconfont = require('gulp-iconfont'),
Nonce = require('nonce-fast'),
nonce = Nonce(9),
plumber = require('gulp-plumber');

const
{paths, runTimestamp} = require('./constants');

function buildIconfont() {
    // Get a nonce for the font name for this build
    // The font file name will change, but since gulp
    // builds the font loading rule, too, everything
    // will be OK
    // This is a cache buster, and should only run
    // when a new font is created
    var fontName = 'icons-' + nonce();
  
    var iconStream = gulp.src(paths.font_svg)
      .pipe(plumber())
      .pipe(iconfont({
        fontName: fontName, // required
        formats: ['ttf', 'eot', 'woff', 'woff2'], // default, 'woff2' and 'svg' are available
        timestamp: runTimestamp, // recommended to get consistent builds when watching files
        normalize: true,
        fontHeight: 1001
      }));
  
    async.parallel([
      function handleGlyphs(cb) {
        iconStream.on('glyphs', function(glyphs, options) {
          gulp.src(paths.font_sass_tpl)
            .pipe(plumber())
            .pipe(consolidate('lodash', {
              glyphs: glyphs,
              fontName: fontName,
              fontPath: '../fonts/',
              className: 'ic'
            }))
            .pipe(gulp.dest(paths.intermediate));
        });
      },
      function handleFonts(cb) {
        iconStream.pipe(gulp.dest(paths.dist_fonts))
          .on('finish', cb);
      }
    ], function() {
      // delete all the generated fonts except the most recent generated one
      del([paths.dist_fonts + '/icon*', '!' + paths.dist_fonts + '/' + fontName + '*']);
    });
  
    return iconStream;
  }

  module.exports = buildIconfont;