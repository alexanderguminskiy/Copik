const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const cleanCSS = require('gulp-clean-css');

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
});

gulp.task('styles', function () {
    return gulp.src('src/sass/blocks/*.scss')
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(autoprefixer({cascade: false}))
      .pipe(rename({suffix: ".min"}))
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest('src/css'))
      .pipe(browserSync.stream());
  });

gulp.task('watch', function() {
    gulp.watch('src/sass/**/*.scss', gulp.parallel('styles'));
    gulp.watch('src/*.html').on("change", browserSync.reload);
});

gulp.task('default', gulp.parallel('server', 'styles', 'watch'));