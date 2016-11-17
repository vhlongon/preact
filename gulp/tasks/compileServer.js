'use strict';

import config     from '../config';
import gulp       from 'gulp';
import notify     from 'gulp-notify';
import babel      from 'gulp-babel';
import gutil      from 'gulp-util';
import Cache      from 'gulp-file-cache';

var cache = new Cache();

gulp.task('compileServer', function () {
  return gulp.src(config.scripts.serverFileSource) // your ES2015 code 
    // .pipe(cache.filter()) // remember files 
    .pipe(babel({
        presets: ['es2015', 'stage-0'],
        plugins: [
            ["transform-react-jsx", { "pragma":"preact.h" }],
            "transform-object-rest-spread"
        ]
    })) // compile new ones 
    // .pipe(cache.cache()) // cache them 
    .pipe(gulp.dest(global.isProd ? config.scripts.prodDest : config.scripts.dest)) // write them 
})

// // Input file.
// watchify.args.debug = true;
// let bundler = watchify(browserify(config.scripts.entryFile, watchify.args));

// // Babel transform
// bundler.transform(babelify.configure({
//     sourceMapRelative: config.scripts.baseUrl,
//     presets: ['es2015', 'stage-0'],
//     plugins: [
//         ["transform-react-jsx", { "pragma":"preact.h" }],
//         "transform-object-rest-spread"
//     ]
// }));

// // On updates recompile
// bundler.on('update', bundle);

// function bundle() {
//   let start = Date.now();
//   gutil.log('Compiling JS...');

//   return bundler.bundle()
//       .on('error', function (err) {
//           gutil.log(err.message);
//           browserSync.notify('Browserify Error!');
//           this.emit('end');
//       })
//       .pipe(exorcist(config.scripts.sourceMapDest))
//       .pipe(source(config.scripts.outputFile))
//       .pipe(gulp.dest(global.isProd ? config.scripts.prodDest : config.scripts.dest))
//       .pipe(notify(function displayBundleMessage() {
//         gutil.log('APP bundle built in ' + (Date.now() - start) + 'ms');
//       }))
//       .pipe(browserSync.stream({ once: true }));
// }


// // Scripts task
// gulp.task('scripts', function () {
//     return bundle();
// });