var	gulp = require('gulp'),
	watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();

// основная задача; ее запускаем 'gulp watch'
gulp.task('watch', function() {
	// инициализируем объект сервер синхронизации с браузером; при этом
	// в качестве аргумента сервера передается путь директории, в которой
	// находится приложение, запускаемое в браузере; после инициализации
	// страница открывается в браузере
	browserSync.init({
		host: '192.168.1.38',
		notify: true,
		server: {
			baseDir: "app"
		}
	});

	// после сохранения изменений в файл index.html
	// перегружаем страницу в браузере
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
