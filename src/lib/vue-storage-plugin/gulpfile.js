const { series, parallel } = require('gulp');
const path = require('path');
const resolve = (dir) => {
    return path.join(__dirname, dir)
}
const resolveIconLoader = () => {

}
gulp.task("icon", async () => {
    gulp.src(resolve("src/assets/svg")).pipe(resolveIconLoader())
})