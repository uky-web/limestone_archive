
var runTimestamp = Math.round(Date.now() / 1000);
const interactive = false;

const paths = {
sass: ['assets/scss/**/*.scss'],
  lib: ['assets/lib/**/*.js'],
  js: ['assets/js/**/*.js'],
  xml: ['assets/xml/**/*.xml'],
  images: ['assets/images/**/*'],
  fonts: ['assets/fonts/**/*'],
  font_svg: ['assets/font-svg/**/*.svg'],
  font_sass_tpl: ['assets/font-svg/_iconfont.scss'],
  intermediate: 'intermediate',
  dist_css: 'dist/css',
  dist_js: 'dist/js',
  dist_xml: 'dist/xml',
  dist_lib: 'dist/js/lib',
  dist_images: 'dist/images',
  dist_fonts: 'dist/fonts'
}

const sassIncludePaths = ['./assets/scss/tokens/', './assets/scss/includes/']

// Error reporter for plumber.
const plumber_error = function(err) {
  if (!interactive) {
    throw err;
  }
  log(colors.red(err));
  this.emit('end');
};

module.exports = {
  runTimestamp,
  paths,
  plumber_error,
  sassIncludePaths
}