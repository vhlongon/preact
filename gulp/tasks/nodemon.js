'use strict';

import config      from '../config';
import gulp        from 'gulp';
import nodemon     from 'gulp-nodemon';
import browserSync from 'browser-sync';

gulp.task('nodemon', function (cb) {
  let called = false;
  return nodemon({
    script: config.scripts.serverFile,
    ignore: [
      'gulpfile.babel.js',
      'node_modules/'
    ],
    tasks: ['compileServer']
  })
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      browserSync.reload({ stream: false });
    }, 1000);
  });
});