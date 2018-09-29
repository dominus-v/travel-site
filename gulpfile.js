var	gulp = require('gulp'),
	watch = require('gulp-watch'),
	postCSS = require('gulp-postcss'),
	autoPrefixer = require('autoprefixer'),
	cssVars = require('postcss-simple-vars'),
	nested = require('postcss-nested'),
	cssImport = require('postcss-import'),
	browserSync = require('browser-sync').create();

gulp.task('default', function() {
	console.log('Hey, a lot of tasks to be solved! Go ahead!');
});

gulp.task('html', function() {
	console.log('Some useful stuff for html expected to be here!');
});

gulp.task('styles', function() {
	return gulp.src('./app/assets/styles/styles.css')
		.pipe(postCSS([cssImport, autoPrefixer, nested, cssVars]))
		.pipe(gulp.dest('./app/temp/styles/'));
});

gulp.task('watch', function() {
	// инициализируем объект сервер синхронизации с браузером, при этом
	// в качестве аргумента сервера передается путь директории, в которой
	// находится приложение, запускаемое в браузере
	browserSync.init({
		host: '192.168.1.43',
		notify: false,
		server: {
			baseDir: "app"
		}
	});

	watch('./app/index.html', function() {
		browserSync.reload();
	});

	watch('./app/assets/styles/**/*.css', function() {
		gulp.start('cssInject');
	});
});

// задача для отправки файла стилей в браузер
// перед отправкой, выполняется задача CSS-препроцессинга 'styles'
gulp.task('cssInject', ['styles'], function(){
	// отправляем файл стилей 'styles.css' в поток browserSync
	// иными словами, отправляем файл стилей в браузер
	return gulp.src('./app/temp/styles/styles.css')
		.pipe(browserSync.stream());
});
