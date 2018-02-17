'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cssminify = require('gulp-csso');
var htmlminify = require('gulp-htmlmin');
var rename = require("gulp-rename");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var bsync = require("browser-sync").create();

// Prepare prefixed CSS
gulp.task('sass', function () {
  return gulp.src('./app/sass/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({browsers: ["last 2 versions"]})
      ]))
    .pipe(cssminify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest('./build/css/'))
    ;//.pipe(bsync.reload({stream: true}));
});

// Copy html to build
gulp.task('html', function () {
  return gulp.src('./app/**/*.html')
    .pipe(htmlminify({collapseWhitespace: true}))
    .pipe(gulp.dest('./build/'));
});

// Browser sync
// gulp.task('browser-sync', function () {
//    var files = [
//       '**/*.html',
//       'css/**/*.css',
//       'img/**/*.{png, jpg, svg, gif}',
//       'js/**/*.js'
//    ];
//
//    bsync.init(files, {
//       server: {
//          baseDir: './build'
//       }
//       //,
//       //notify: false // Отключаем уведомления
//    });
// });

gulp.task('watch', function() {
  gulp.watch('./app/sass/**/*.scss', ['sass']);
  gulp.watch('./app/**/*.html', ['html']);
});

gulp.task('build', ['sass', 'html']);
