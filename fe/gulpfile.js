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
// 获取项目目录结构
var through = require('through2');
var commands = [];
// 获取路径并保存
gulp.task('getPaths', function () {
  return gulp.src('./views/!(task)/*/*.html')
  .pipe(through.obj(function (file, enc, callback) {
		// console.log('file', file)
		this.push(file.path);
		callback();
	})).on('data', function (data) {
		commands.push(data);
		console.log(data); 
	})
});