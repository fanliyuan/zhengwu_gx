var gulp = require('gulp');
var fileinclude  = require('gulp-file-include');
var uglify = require('gulp-uglify');
var filter=require('gulp-filter');/*过滤器：筛选，恢复*/

gulp.task('build', function() {
  var jsFilter=filter('**/*.js',{restore:true});
  gulp.src('src/pages/**.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './src/'
    }))
    .pipe(gulp.dest('dist'));
  gulp.src(['src/assets/**.js', '!node_modules/**/*']).pipe(gulp.dest('dist/assets'));
  gulp.src(['src/js/**.js', '!node_modules/**/*']).pipe(jsFilter).pipe(uglify()).pipe(jsFilter.restore).pipe(gulp.dest('dist/js'));
  gulp.src(['src/css/**.css', '!node_modules/**/*']).pipe(gulp.dest('dist/css'));
  gulp.src(['src/img/**.*', '!node_modules/**/*']).pipe(gulp.dest('dist/img'));
});
// 监听文件修改
gulp.task('watch',function () {
  gulp.watch(['src/pages/*.html','src/commons/*.html','src/js/*.js','src/css/*.css','src/img/*','!dist/**/*.html','!dist/**/*.js','!dist/**/*.css','!dist/img/**/*'], ['build']);
 });

// 以下有高级用法,压缩代码,生成哈希码防止缓存等等

// var gulp=require('gulp');
// var rev=require('gulp-rev');/*给文件用哈希码添加版本号*/
// var revReplace=require('gulp-rev-replace');/*更新引用*/
// var useref=require('gulp-useref');/*合并文件*/
// var filter=require('gulp-filter');/*过滤器：筛选，恢复*/
// var uglify=require('gulp-uglify');/*压缩js*/
// var csso=require('gulp-csso');/*压缩css*/

// gulp.task('build',function(){

//   var jsFilter=filter('**/*.js',{restore:true});
//   var cssFilter=filter('**/*.css',{restore:true});
//   var indexHtmlFilter=filter(['**/*','!**/index.html'],{restore:true});

//   return gulp.src('src/html')/*需要处理的文件*/
//     .pipe(useref())/*处理注释压缩*/
//     .pipe(jsFilter)/*筛选js文件*/
//     .pipe(uglify())/*压缩js文件*/
//     .pipe(jsFilter.restore)/*放回流里*/
//     .pipe(cssFilter)/*筛选css文件*/
//     .pipe(csso())/*压缩css文件*/
//     .pipe(cssFilter.restore)/*放回流里*/
//     .pipe(indexHtmlFilter)/*筛选html文件*/
//     .pipe(rev())/*生成哈希版本号*/
//     .pipe(indexHtmlFilter.restore)/*放回流里*/
//     .pipe(revReplace())/*更新index引用*/
//     .pipe(gulp.dest('dist'));/*文件流放到dist目录下*/
// });