var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: false}) // grabs all node modules prepended
// with 'gulp' and adds them to the $ object.


var client = { // all of the roots for our directories relative to our gulp file
	root: './client', // this makes our code cleaner/easier to write
	index: './client/index.html', // grouping files by folder
	scripts: ['./client/app/**/*.js', '!./client/app/modules/**/*.js'], // '**' is any directory, '*' any file
	css: './client/app/styles/*.css',
}

var options = {
	inject: {
		app: {
			relative: true, // looking up what $sequence does
			name: 'app', // name of directory
		},
		modules: {
			relative: true,
			name: 'modules',
		},
		css: {
			relative: true,
			name: 'styles',
		},
	},
}

gulp.task('default', ['dev']); // defaults so you  only have to type 'gulp' in to the terminal to run whatevers in the array
gulp.task('dev', $.sequence('inject', 'server')); // uses sequence to run tasks in order
gulp.task('server', server); // runs the server in a separate functions
gulp.task('inject', inject); // runs an inject functions





function server(){
	require('./server.js');
}

function inject(){
	var scripts = gulp.src(client.scripts, {read:false});
	var modules = gulp.src('./client/app/modules/**/*.js', {read:false});
	var css = gulp.src(client.css, {read:false});
	// var bootstrap = gulp.src('./client/app/www/lib/bootstrap/dist/bootstrap-theme.min.css', {read:false});
	// 'read: false' keeps stream
	// from reading entire file. All we want is path.
	return gulp.src(client.index)
		.pipe($.inject(scripts, options.inject.app)) // pipe allows you to add multiple processes to your gulp stream
		.pipe($.inject(modules, options.inject.modules)) // with inject, you include the stream to the files to be injected
		.pipe($.inject(css, options.inject.css))
		// .pipe($.inject(bootstrap, options.inject.css))
		.pipe(gulp.dest(client.root)); // dest is the destination of the stream - should be last
}