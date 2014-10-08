"use strict";

var Gulp = require('gulp')
  , Less = require('gulp-less')
  , Assets = require('gulp-asset')
  , LiveReload = require('gulp-livereload');

Gulp.task('less', function () {
  Gulp.src('./public/less/app.less')
    .pipe(Less())
    .pipe(Gulp.dest('./public/css'));
});

Gulp.task('assets', function () {

});

Gulp.task('watch-live-reload', function () {
  LiveReload.listen();
  Gulp.watch('public/**/*').on('change', LiveReload.changed);
});

Gulp.task('watch-less', function () {
  Gulp.watch('public/less/**/*.less').on('change', function () {
    Gulp.run('less');
  })
});

Gulp.task('default', ['less', 'watch-less', 'watch-live-reload']);