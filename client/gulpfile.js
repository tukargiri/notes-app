"use strict";
var gulp = require('gulp');

var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');

gulp.task('build-prod', function () {
	return gulp.src('./*.html')
		.pipe(usemin({
			css: [minifyCss(), 'concat'],
			html: [minifyHtml({
				empty: true
			})],
			appjs: [uglify(), rev()],
			js: [uglify(), rev()]
		}))
		.pipe(gulp.dest('build/'));
});

// var concat = require('gulp-concat'),
// 	jsmin = require('gulp-jsmin'),
// 	rename = require('gulp-rename');

// gulp.task('minify', function () {
// 	var taskOutput = gulp.src('./scripts/**/*.js')
// 		.pipe(concat('app.js'))
// 		.pipe(jsmin())
// 		.pipe(rename({
// 			suffix: '.min'
// 		}))
// 		.pipe(gulp.dest('./dist/'));

// 	return taskOutput;
// });

var server = require('gulp-server-livereload');

gulp.task('server', function () {
	gulp.src('.')
		.pipe(server({
			port: 8989,
			livereload: true,
			defaultFile: './index.html',
			open: true
		}));
});