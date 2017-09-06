'use strict';

var gulp = require('gulp'),
    inlineCss = require('gulp-inline-css'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    runSequence = require('run-sequence');


gulp.task('sass', function() {
    return gulp.src('./src/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/'));
});

gulp.task('inline', function() {
    return gulp.src('./src/*.html')
        .pipe(inlineCss({
            removeHtmlSelectors: true
        }))
        .pipe(gulp.dest('./build/'));
});

gulp.task('watch', function() {
    watch('./src/*.scss', function() {
        gulp.start('build');


    });
    watch('./src/*.html', function() {
        gulp.start('build');
    });

});

gulp.task('build', function(callback) {
    runSequence('sass', 'inline', callback);
});


gulp.task('default', ['build', 'watch']);



