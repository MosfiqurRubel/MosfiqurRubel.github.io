/*---------- Declare gulp variables ----------*/

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    compass = require('gulp-compass'),
    plumber = require('gulp-plumber'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename');

/*---------- Tasks ----------*/
gulp.task('scripts', function () {
    //gulp.src('app/js/**/*.js')
    gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
        .pipe(reload({
            stream: true
        }));
});

// Compass
gulp.task('compass', function () {
    gulp.src('app/sass/style.scss')
        .pipe(plumber())
        .pipe(compass({
            config_file: './config.rb',
            css: 'app/css',
            sass: 'app/sass',
            image: 'app/images',
            require: ['breakpoint']
        }))

        .pipe(gulp.dest('app/css/'))
        .pipe(reload({
            stream: true
        }));
});

// HTML Task
gulp.task('html', function () {
    gulp.src('app/**/*.html')
        .pipe(reload({
            stream: true
        }));
});

// Image Task
gulp.task('image', function () {
    gulp.src('app/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('app/images/'));
});

// Browser-Sync Tasks
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: "./app/"
        }
    });
});

/*---------- Environements Tasks ----------*/
gulp.task('watch', function () {
    gulp.watch('app/js/**/*.js', ['scripts']);
    gulp.watch('app/sass/**/*.scss', ['compass']);
    gulp.watch('app/**/*.html', ['html']);
    gulp.watch('app/images/img', ['image']);
});

// Default Task
gulp.task('default', ['scripts', 'compass', 'html', 'image', 'browser-sync', 'watch']);