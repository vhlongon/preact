'use strict';

import config      from '../config';
import changed     from 'gulp-changed';
import gulp        from 'gulp';
import gulpif      from 'gulp-if';
import imagemin    from 'gulp-imagemin';
import browserSync from 'browser-sync';

const pngquant = require('imagemin-pngquant');

gulp.task('images', function() {

  return gulp.src(config.images.src)
    .pipe(changed(config.images.dest)) // Ignore unchanged files
    .pipe(gulpif(global.isProd, 
      imagemin(
        [pngquant({quality: '65-80'})],
        { progressive: true } 
      )
    )) // Optimize
    .pipe(gulp.dest(global.isProd ? config.images.prodDest : config.images.dest))
    .pipe(browserSync.stream({ once: true }));

});