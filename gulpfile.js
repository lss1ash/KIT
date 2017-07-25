'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var bsync = require("browser-sync").create();

// var clean = require('gulp-clean');

// Prepare prefixed CSS
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({browsers: ["last 2 versions"]})
      ]))
    .pipe(gulp.dest('./build/css'))
    .pipe(bsync.reload({stream: true}));
});

// gulp.task('sass:clean', function () {
//     return gulp.src('./build/css/*.css', {read: false})
//         .pipe(clean());
// });

gulp.task('sass:watch', function () {
  var watcher = gulp.watch('./sass/**/*.scss', ['sass']);
  watcher.on('delete', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
  return watcher;
});

// Copy html to build
gulp.task('html', function () {
  return gulp.src('./**/*.html')  // УБРАТЬ ЗАЦИКЛИВАНИЯ!!!!
    .pipe(gulp.dest('./build/'));
});
//
// gulp.task('html:clean', function () {
//     return gulp.src('./build/**/*.html', {read: false})
//         .pipe(clean());
// });
//
gulp.task('html:watch', function () {
  return gulp.watch('./**/*.html', ['html']);
});

// Browser sync
gulp.task('browser-sync', function () {
   var files = [
      '**/*.html',
      'css/**/*.css',
      'img/**/*.{png, jpg, svg, gif}',
      'js/**/*.js'
   ];

   bsync.init(files, {
      server: {
         baseDir: './build'
      },
      //notify: false // Отключаем уведомления
   });
});

gulp.task('listener', ['html:watch', 'sass:watch']);
