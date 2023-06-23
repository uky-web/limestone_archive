const { watch,series, pipe, src, parallel, dest } = require('gulp'),
{paths} = require('./constants');

const buildFonts = require('./buildFonts'),
buildLibs = require('./buildLibs'),
buildXML = require('./buildXML'),
buildJS = require('./buildJS'),
buildCSS = require('./buildCSS'),
buildImages = require('./buildImages'),
buildIconfont = require('./buildIconfont');
const { exec } = require('node:child_process')
const { spawn } = require('node:child_process')

const watcher = function(cb){
    watch(paths.sass.concat(paths.font_sass_tpl),buildCSS);
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
    // start: series(build, watcher),
    watch: watcher
};


/*** Patternlab gulp tooling ********
 * If patternlab is refactored into a workspace or other 
 * managed sub-package this tooling should go with it.
 */


const {buildPatternlabFiles, buildPatternlabPages, buildPatternlab} = require('./buildPatternlab');
const {servePatternlab} = require('./servePatternlab');
const patternlabPaths = {
    twig: ["./patternlab/source/_patterns/**/*.twig","./components/**/*.twig"],
    markdown: "./patternlab/source/_patterns/**/*.md",
    json: "./patternlab/source/_patterns/**/*.json",
    css:"./patternlab/public/css",
    js:"./patternlab/public/js",
    fonts: "./patternlab/public/fonts",
    images:"./patternlab/public/images"
}


const watchPatternlab = function(cb){
    const browserSync = require('browser-sync').get('patternlab');
    watch(paths.dist_css, function movePatternlabCSS(cb){
      return  src(paths.dist_css+"/*")
        .pipe(dest(patternlabPaths.css))
        .pipe(browserSync.stream()); 
       
    })

    watch(paths.dist_js, function movePatternlabJS(cb){
        return  src(paths.dist_js+"/*")
          .pipe(dest(patternlabPaths.js))
          .pipe(browserSync.stream()); 
      })

    watch(paths.dist_fonts, function movePatternlabFonts(cb){
        return  src(paths.dist_fonts+"/*")
          .pipe(dest(patternlabPaths.fonts))
          .pipe(browserSync.stream()); 
      })

    watch(paths.dist_images, function movePatternlabImages(cb){
        return  src(paths.dist_images+"/*")
          .pipe(dest(patternlabPaths.images))
          .pipe(browserSync.stream()); 
      })

    watch(patternlabPaths.twig.concat(patternlabPaths.markdown,patternlabPaths.json), function moveFiles(cb){
        const browserSync = require('browser-sync').get('patternlab');
        buildPatternlabPages(function(){
            browserSync.reload();
            cb();
        });
    })
    cb()
}

module.exports.start = series(build, watcher, buildPatternlab,servePatternlab, watchPatternlab);

