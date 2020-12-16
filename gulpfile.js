const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
});

gulp.task('styles', function () {
    return gulp.src('src/sass/blocks/*.scss')
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(autoprefixer({cascade: false}))
      .pipe(rename({suffix: ".min"}))
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.stream());
  });

gulp.task('html', () => {
return gulp.src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

gulp.task('img', () => {
    return gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});

gulp.task('icons', () => {
    return gulp.src('src/icons/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/icons'))
});

gulp.task('fonts', () => {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task('js', () => {
    return gulp.src('src/js/*')
        .pipe(gulp.dest('dist/js'))
});

gulp.task('mailer', () => {
    return gulp.src('src/mailer/**/*')
        .pipe(gulp.dest('dist/mailer'))
});


gulp.task('watch', function() {
    gulp.watch('src/sass/**/*.scss', gulp.parallel('styles'));
    gulp.watch('src/*.html').on("change", browserSync.reload);
});

gulp.task('default', gulp.parallel('server', 'watch', 'html', 'fonts', 'img', 'icons', 'styles', 'js', 'mailer'));