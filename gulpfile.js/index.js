const { watch,series, pipe, src, parallel } = require('gulp'),
{paths} = require('./constants');

const buildFonts = require('./buildFonts'),
buildLibs = require('./buildLibs'),
buildXML = require('./buildXML'),
buildJS = require('./buildJS'),
buildCSS = require('./buildCSS'),
buildImages = require('./buildImages'),
buildIconfont = require('./buildIconfont');
//// Patternlab-specific tasks
const {buildPatternlabFiles, buildPatternladPages} = require('./buildPatternlab');
const {startPatternlab, browserSync} = require('./startPatternlab');


const watcher = function(){
    watch(paths.sass.concat(paths.font_sass_tpl), buildCSS);
    watch(paths.js, buildJS);
    watch(paths.lib, buildLibs);
    watch(paths.images, buildImages);
    watch(paths.fonts, buildFonts);
    watch(paths.xml, buildXML);
    watch(paths.font_svg, series(buildIconfont, buildCSS))
    // watch(paths.dist_css, rel)
}

const build = series(
    buildIconfont,
    buildCSS,
    buildLibs,
    buildJS,
    buildXML,
    buildImages,
    buildFonts
)


// export public gulp tasks
module.exports = { 
    build,
    start: series(build, startPatternlab, watcher),
    watch: watcher
};

const watchPatternlabCSS = function(){
    watch(paths.dist_css, function(){
        src(paths.dist_css)
        .pipe(browserSync.stream());
    })
}

const watchPatternlabTwig = function(){
    
}


module.exports.startPatternlab = parallel(startPatternlab, watchPatternlabCSS);
module.exports.watchPatternlabCSS = watchPatternlabCSS;

