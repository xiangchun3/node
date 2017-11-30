import gulp from 'gulp'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'
import serve from 'gulp-serve'

gulp.task('js', () => {
  gulp.src('./jShit.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./'))
})

gulp.task('watch', () => {
  gulp.watch('./jShit.js', ['js'])
})

gulp.task('serve', serve({
  port: 3000,
  root: '.'
}))

gulp.task('build', ['js'])

gulp.task('default', ['build', 'watch', 'serve'])
