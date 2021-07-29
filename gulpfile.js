var gulp = require('gulp');
var uglify = require('gulp-uglify')
var babel=require('gulp-babel')
gulp.task("uglify", function () {
    gulp.src("./src/lib/echarts.js").pipe(babel({
        presets:[
            '@babel/env'
        ]
    }))
    .pipe(uglify()).pipe(gulp.dest("./build"))
})