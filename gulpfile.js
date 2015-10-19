var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('mini', function() {
  gulp.src('jquery.placeholder.js')
      .pipe(uglify())
      .pipe(rename({ extname: '.min.js' }))
      .pipe(gulp.dest('./'));
});

gulp.task('default', ['mini']);
