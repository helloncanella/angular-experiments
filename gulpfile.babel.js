// generated on 2016-01-27 using generator-chrome-extension 0.5.1

'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import watchify from 'watchify' ;
import babel from 'babelify' ;
import glob from 'glob';

const $ = gulpLoadPlugins();

gulp.task('browserify', function() {

  var sourceFiles = glob.sync('./app/scripts/babel/*.js');

  var options = {
    entries: sourceFiles,
    debug: true
  };

  var b = watchify(browserify(options)),
      bundler = b.transform(babel.configure({
                  presets: ['es2015']
                }));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('build.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./app/scripts'));
  }

  bundler.on('update', function() {
    console.log('-> bundling...');
    rebundle();
  });

  rebundle();
});


gulp.task('watch', ['browserify'], () => {
  $.livereload.listen();

  gulp.watch([
    'app/*.html',
    'app/scripts/*.js',
    'app/images/**/*',
    'app/styles/**/*',
    'app/_locales/**/*.json'
  ]).on('change', $.livereload.reload);

  gulp.watch('./app/scripts/babel/**/*.js', ['browserify']);
});
