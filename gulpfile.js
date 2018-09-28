var	gulp = require('gulp'),
	watch = require('gulp-watch'),
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	cssvars = require('postcss-simple-vars'),
	nested = require('postcss-nested'),
	cssimport = require('postcss-import');

gulp.task('default', function() {
	console.log('Hey, a lot of tasks to be solved! Go ahead!');
});

gulp.task('html', function() {
	console.log('Some useful stuff for html expected to be here!');
});

gulp.task('styles', function() {
	return gulp.src('./app/assets/styles/styles.css')
		.pipe(postcss([cssimport, autoprefixer, nested, cssvars]))
		.pipe(gulp.dest('./app/temp/styles/'));
})

gulp.task('watch', function() {
	watch('./app/index.html', function() {
		gulp.start('html');
	});

	watch('./app/assets/styles/**/*.css', function() {
		gulp.start('styles');
	})
})
