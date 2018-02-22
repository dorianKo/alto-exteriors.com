const gulp = require('gulp');
const sass = require('gulp-sass');
const assets = {
    scss: 'scss/**/*.scss'
};

gulp.task('styles', () => {
    gulp.src(assets.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./styles/'));
});

gulp.task('default', () => {
    gulp.watch(assets.scss, ['styles']);
})