const 
browserSync = require('browser-sync'),
exec = require('child_process').exec,
{watch, src, dest, series} = require('gulp'),
path = require('path'),
{paths} = require('./constants');

const buildPatternlabFiles = function(){
  //Get the assets
  return src("dist/**/*")
  .pipe(dest('./patternlab/public/'))
}

const buildPatternlabPages = function(cb){
    //Build the static site
    exec('php patternlab/core/console --generate', function(err, stdout, stderr) {
        if (stdout) {
          console.log(stdout);
        }
        if (stderr) {
          console.log(stderr);
        }
        if (cb) {
          cb();
        }
      });
}



module.exports = {
    buildPatternlabFiles,
    buildPatternlabPages,
    buildPatternlab: series(buildPatternlabFiles, buildPatternlabPages)
}







