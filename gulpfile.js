var gulp        = require('gulp'),
    browserSync = require('browser-sync')
    sass = require('gulp-sass'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat')


gulp.task('serve', ['process', 'compile'], function(){
  browserSync.init({
    server: {
      baseDir:'dist'
    }
  })

  gulp.watch(['src/**/*.js'], ['compile'])
  gulp.watch(["src/sass/*.scss"], ['process']);
  gulp.watch(['dist/*.html','src/sass/*.scss','src/**/*.js']).on('change', browserSync.reload)

})

gulp.task('compile', function(){
  return gulp.src('src/**/*.js')
             .pipe(babel({
               presets:['es2015']
             }))
             .pipe(gulp.dest('dist/js'))
})

gulp.task('process', function(){
  return gulp.src('src/sass/*.scss')
             .pipe(sass())
             .pipe(concat('styles.css'))
             .pipe(gulp.dest('./dist/css'))
             .pipe(browserSync.stream())
})

gulp.task('default', ['serve'])