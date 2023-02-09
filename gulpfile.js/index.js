const { watch,series, pipe, src, parallel, dest } = require('gulp'),
{paths} = require('./constants');

const buildFonts = require('./buildFonts'),
buildLibs = require('./buildLibs'),
buildXML = require('./buildXML'),
buildJS = require('./buildJS'),
buildCSS = require('./buildCSS'),
buildImages = require('./buildImages'),
buildIconfont = require('./buildIconfont');



const watcher = function(cb){
    watch(paths.sass.concat(paths.font_sass_tpl), {delay:400}, buildCSS);
    watch(paths.js, buildJS);
    watch(paths.lib, buildLibs);
    watch(paths.images, buildImages);
    watch(paths.fonts, buildFonts);
    watch(paths.xml, buildXML);
    watch(paths.font_svg, series(buildIconfont, buildCSS))
    // watch(paths.dist_css, rel)
    cb();
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
    start: series(build, watcher),
    watch: watcher
};


/*** Patternlab gulp tooling ********
 * If patternlab is refactored into a workspace or other 
 * managed sub-package this tolling should go with it.
 */

//// Patternlab-specific tasks

const {buildPatternlabFiles, buildPatternlabPages, buildPatternlab} = require('./buildPatternlab');
const {servePatternlab} = require('./servePatternlab');
const patternlabPaths = {
    twig: "./patternlab/source/_patterns/**/*.twig",
    css:"./patternlab/public/css"
}


const watchPatternlab = function(){
    const browserSync = require('browser-sync').get('patternlab');
    watch(paths.dist_css, {delay:400}, function movePatternlabCSS(cb){
      return  src(paths.dist_css+"/*")
        .pipe(dest(patternlabPaths.css))
        .pipe(browserSync.stream()); 
       
    })

    watch(patternlabPaths.twig, function moveFiles(){
        const browserSync = require('browser-sync').get('patternlab');
        buildPatternlabFiles();
        browserSync.reload();
    })

}



module.exports.startPatternlab = series(buildPatternlab,servePatternlab, watchPatternlab);

module.exports.startAll = series(build, watcher, buildPatternlab,servePatternlab, watchPatternlab)
