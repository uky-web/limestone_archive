
const browserSync = require('browser-sync').create('patternlab');

const servePatternlab = function(cb){
    
    //set up browsersync
    browserSync.init({
        open:false,
        server: {
            baseDir:"./patternlab/public"
        },
        reloadOnRestart: true
    }, cb)

}


module.exports = {
    servePatternlab
}