'use strict';

import config      from '../config';
import gulp        from 'gulp';
import nodemon     from 'gulp-nodemon';
import browserSync from 'browser-sync';

const baseUrl = global.isProd ? config.scripts.prodDir : config.scripts.dest;

gulp.task('nodemon', ['compileServer'], function (cb) {
  let called = false;
  return nodemon({
    script: `${baseUrl}/${config.server.serverFilerOutput}`,
    ignore: [
      'node_modules/'
    ]
  })
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      browserSync.stream({ once: true });
    }, 1000);
  });
});