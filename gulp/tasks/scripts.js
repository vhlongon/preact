'use strict';

import config     from '../config';
import gulp       from 'gulp';
import gulpif     from 'gulp-if';
import uglify     from 'gulp-uglify';
import browserify from 'browserify';
import babelify   from 'babelify';
import source     from 'vinyl-source-stream';
import buffer     from 'vinyl-buffer';
import notify     from 'gulp-notify';
import babel      from 'gulp-babel';
import watchify   from 'watchify';
import gutil      from 'gulp-util';
import exorcist   from 'exorcist';

import browserSync   from 'browser-sync';

// Input file.
watchify.args.debug = true;
let bundler = watchify(browserify(config.scripts.entryFile, watchify.args));

// Babel transform
bundler.transform(babelify.configure({
    sourceMapRelative: config.scripts.baseUrl,
    presets: ['es2015', 'stage-0'],
    plugins: [
        ["transform-react-jsx", { "pragma":"preact.h" }],
        "transform-object-rest-spread"
    ]
}));

// On updates recompile
bundler.on('update', bundle);

function bundle() {
  let start = Date.now();
  gutil.log('Compiling JS...');

  return bundler.bundle()
      .on('error', function (err) {
          gutil.log(err.message);
          browserSync.notify('Browserify Error!');
          this.emit('end');
      })
      .pipe(exorcist(config.scripts.sourceMapDest))
      .pipe(source(config.scripts.outputFile))
      .pipe(gulp.dest(global.isProd ? config.scripts.prodDest : config.scripts.dest))
      .pipe(notify(function displayBundleMessage() {
        gutil.log('APP bundle built in ' + (Date.now() - start) + 'ms');
      }))
      .pipe(browserSync.stream({ once: true }));
}


// Scripts task
gulp.task('scripts', function () {
    return bundle();
});