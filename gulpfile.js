var gulp = require('gulp');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var fs = require('fs');
var sass = require('gulp-sass')(require('node-sass'));
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
gulp.task('uglify', function() {
  gulp
    .src('./src/lib/echarts.js')
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest('./build'));
});
gulp.task('theme', async () => {
  gulp
    .src(resolve('src/styles/theme/*.scss'))
    .pipe(sass())
    .pipe(gulp.dest(resolve('public/theme')));
});
