var gulp = require('gulp');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var puppeteer = require('puppeteer');
var fs = require('fs');
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
gulp.task('test', async function name(params) {
  const a = await 2;
  console.log(a);
});
gulp.task('firstPaint', async function() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://www.mca.gov.cn/article/sj/xzqh/2019/2019/201912251506.html');
  const data = await page.evaluate(() => {
    var data = [];
    const rows = document.querySelectorAll('table > tbody > tr');
    rows.forEach(row => {
      var columns = row.querySelectorAll('td');
      var node = [];
      columns.forEach(col => {
        if (col.innerText != '') {
          node.push(col.innerText.trim());
        }
      });
      data.push(node);
    });
    return data;
  });
  await page.close();
  await browser.close();
  fs.writeFileSync('dist/data.txt', JSON.stringify(data));
});
