var gulp = require('gulp');
var sass = require('gulp-sass');
// js语法检测
var jshint = require('gulp-jshint');
// 浏览器刷新
var browserSync = require('browser-sync');
// 将多个文件拼接成单一文件，并输出到相应目录
var useref = require('gulp-useref');
// js压缩
var uglify = require('gulp-uglify');
// 流程判断
var gulpIf = require('gulp-if');
// css压缩
var minifyCSS = require('gulp-minify-css');
// 图片压缩
var imagemin = require('gulp-imagemin');
// png图片压缩
var tinypng = require('gulp-tinypng-compress');
// 图片缓存，减少重复压缩
var cache = require('gulp-cache');
// 用于删除目录或文件
var del = require('del');
// 任务批量执行
var runSequence = require('run-sequence');
// css图片转成base64减少请求
var base64 = require('gulp-base64');

// 时间统计
var startTime, endTime;

// js语法检测，忽略jquery库文件
gulp.task('jshint', function(){
    return gulp.src(['app/**/*.js', '!app/js/jquery/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// scss文件转换为css
gulp.task('sass', function(){
    return gulp.src('app/scss/**/*.scss')
    .pipe(sass({'outputStyle': 'expanded'})) //outputStyle取值： nested 继承 compact 紧凑 expanded 展开 compressed 压缩
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
        stream: true
    }));
});

// 监听scss文件修改，自动执行sass命令，将scss文件转换成css文件
gulp.task('watch', ['browserSync'], function(){
    gulp.watch('app/scss/**/*.scss', ['browserSync','sass']);
    gulp.watch('app/html/**/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

// 浏览器刷新
gulp.task('browserSync', function(){
    browserSync({
        server: {
            baseDir: './'
        }
    })
});

// 将多个文件拼接成单一文件，并输出到相应目录
gulp.task('useref', function(){
    return gulp.src('app/html/*.html')
    // .pipe(gulpIf('*.js', uglify()))
    // 使用gulp-if判断文件类型，区分使用方法
    // .pipe(gulpIf('*.css', minifyCSS()))
    .pipe(useref())
    .pipe(gulp.dest('dist'));
});


gulp.task('uglify', function(){
    return gulp.src('dist/js/**/*')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('minifyCSS', function(){
    return gulp.src('dist/css/**/*')
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'));
});

// 图片压缩
gulp.task('minifyImages', function(){
    return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin({
        optimizationLevel: 2, //类型：Number  默认：3  取值范围：0-7（优化等级）
        progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
        interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
        multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
    })))
    .pipe(tinypng({
        key: 'Y0dpbrKnt8ye_P8j0vRXcxRplEYzdFs7',
        summarise: true,
        log: true
    }))
    .pipe(gulp.dest('dist/images'));
});

// 清理dist目录后，再构建
gulp.task('clean', function(){
    del('dist');
});

// css图片转成base64
gulp.task('cssBase64', function(){
    return gulp.src('dist/**/*.css')
    .pipe(base64({
        extensions: [/#base64/i],
        maxImageSize: 200 * 1024 // bytes，最大字节,最大允许200KB的文件转化
    }))
    .pipe(gulp.dest('dist'));
});

// 使用 run sequence同步执行任务，用于开发
gulp.task('dev', function(){
    runSequence(
        'watch',
        function(){
            console.log('run dev!');
        }
    );
});

function formatTime(startTime, endTime){
    let time = endTime - startTime;
    return time/1000;
}

// 使用run sequence同步执行任务，用于发布
gulp.task('build', function(){
    startTime = new Date().getTime();
    runSequence(
        'clean',
        'jshint',
        'sass',
        'useref',
        'uglify',
        'minifyCSS',
        'minifyImages',
        'cssBase64',
        // 'watch',
        function (){
            endTime = new Date().getTime();
            console.log('build success!' + "\n总耗时" + formatTime(startTime, endTime) + "秒");
        }
    );
});