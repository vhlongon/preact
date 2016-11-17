'use strict';

import config      from '../config';
import url         from 'url';
import browserSync from 'browser-sync';
import gulp        from 'gulp';
import nodemon     from 'gulp-nodemon';

gulp.task('browserSync', ['nodemon'], function() {

  const DEFAULT_FILE = 'index.html';
  const ASSET_EXTENSIONS = ['js', 'css', 'png', 'jpg', 'jpeg', 'gif'];

  browserSync.init({
    // server: {
    //   baseDir: global.isProd ? config.prodDir : config.buildDir
    // },
    proxy: `localhost:${config.browserPort}`,  // local node app address
  	ui: {
    	port: config.UIPort
    },
    ghostMode: {
      links: false
    }
  });

});

//   const DEFAULT_FILE = 'index.html';
//   const ASSET_EXTENSIONS = ['js', 'css', 'png', 'jpg', 'jpeg', 'gif'];

//   browserSync.init({
//     server: {
//       baseDir: global.isProd ? config.prodDir : config.buildDir
//     },
//   	port: config.browserPort,
//   	ui: {
//     	port: config.UIPort
//     },
//     ghostMode: {
//       links: false
//     }
//   });

