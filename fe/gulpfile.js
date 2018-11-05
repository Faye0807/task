var gulp = require('gulp');
var less = require('gulp-less');
var webserver = require('gulp-webserver');

gulp.task('demo', function() {
    gulp.src('./')
    .pipe(webserver({
			host: '0.0.0.0',
			port: 1995,
			livereload: true,
			directoryListing: true,
			open: true
    }))
});
gulp.task('less', function() {
  console.log('less')
	gulp.src('./static/*.less')
	.pipe(less())
	.pipe(gulp.dest('../src/static/css'))
})