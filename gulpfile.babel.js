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

//browserSync
var browserSync = require('browser-sync').create();

const $ = gulpLoadPlugins();

gulp.task('sass', function() {
    return gulp.src('./app/stylesheets/bundle.scss')
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./app/stylesheets'));
});

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

gulp.task('watch', [/*'browserify',*/ 'sass'], () => {

  browserSync.init({
    server: "./app",
    notify: false
  });

  gulp.watch([
    'app/**/*.html',//load whenever a template change
    'app/stylesheets/bundle.css',
    'app/scripts/**/*.js',
  ]).on('change', browserSync.reload);

  //gulp.watch('./app/scripts/babel/**/*.js', ['browserify']);
  gulp.watch('./app/stylesheets/**/*.scss', ['sass']);
});
