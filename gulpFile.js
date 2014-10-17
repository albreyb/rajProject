var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: false}) // grabs all node modules prepended
// with 'gulp' and adds them to the $ object.
var client = {
	root: './client',
	index: './client/index.html',
	scripts: ['./client/app/**/*.js', '!./client/app/modules/**/*.js'] // '**' is any directory, '*' any file
}

var options = {
	inject: {
		app: {
			relative: true,
			name: 'app',
		},
		modules: {
			relative: true,
			name: 'modules',
		}
	},
}

gulp.task('default', ['dev']);
gulp.task('dev', $.sequence('inject', 'server'));
gulp.task('server', server);
gulp.task('inject', inject);





function server(){
	require('./server.js');
}

function inject(){
	var scripts = gulp.src(client.scripts, {read:false});
	var modules = gulp.src('./client/app/modules/**/*.js', {read:false});
	// read: false keeps stream
	// from reading entire file. All we want is path.
	return gulp.src(client.index)
		.pipe($.inject(scripts, options.inject.app))
		.pipe($.inject(modules, options.inject.modules)) // with inject, you include the stream to the files to be injected
		.pipe(gulp.dest(client.root)); // dest is the destination of the stream - should be last
}