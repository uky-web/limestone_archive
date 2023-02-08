const {buildPatternlab} = require('./buildPatternlab');
const {series} = require('gulp');
const browserSync = require('browser-sync').create();

const startPatternlab = function(){
    
    //set up browsersync
    browserSync.init({
        open:false,
        server: {
            baseDir:"./patternlab/public"
        }
    })
}


module.exports = {
    startPatternlab: series(buildPatternlab,startPatternlab),
    browserSync: browserSync
}