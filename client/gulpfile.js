"use strict";
var gulp = require('gulp');

var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var server = require('gulp-server-livereload');

// Can change the port accordingly
var PORT = 8585;

// This task will minify js and css files for production deployment
// This task will create a 'build' folder in current directory; directly deploy contents of build
// Note :- Use this task only for deploying on production
gulp.task('deploy', function () {
	return gulp.src('./index.html')
		.pipe(usemin({
			css: [minifyCss(), 'concat'],
			html: [minifyHtml({
				quotes: true
			})],
			appjs: [uglify(), rev()],
			libjs: [uglify(), rev()]
		}))
		.pipe(gulp.dest('build/'));
});


// This task will create UI server with live reload feature
gulp.task('server', function () {
	gulp.src('.')
		.pipe(server({
			port: PORT,
			livereload: false,
			// livereload: true,
			defaultFile: './index.html',
			open: true
		}));
});