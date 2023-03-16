function browsersyncServe(cb){
    browsersync.init({
      server: {
        baseDir: '.'
      }    
    });
    cb();
  }
  