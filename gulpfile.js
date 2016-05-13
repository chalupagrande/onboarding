var babel = require('gulp-babel'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    gulp = require('gulp'),
    sass = require('gulp-sass');


gulp.task('serve', ['process', 'compile'], function(){
  browserSync.init({
    server: {
      baseDir:'dist'
    }
  })


  gulp.watch(['src/**/*.js'], ['compile'])
  gulp.watch(["src/sass/**/*.scss"], ['process']);
  gulp.watch(['dist/*.html','src/sass/**/*.scss','src/**/*.js']).on('change', browserSync.reload)

})
gulp.task('components', function(){
  return gulp.src('src/scripts/components/*.js')
             .pipe(concat('components.js'))
             .pipe(babel({
               presets:['es2015']
             }))
             .pipe(gulp.dest('./dist/js'))
             .pipe(browserSync.stream())
})


gulp.task('compile', ['components'],function(){
  return gulp.src('src/scripts/*.js')
             .pipe(babel({
               presets:['es2015']
             }))
             .pipe(gulp.dest('dist/js'))
})

gulp.task('process', function(){
  return gulp.src('src/sass/**/*.scss')
             .pipe(sass())
             .pipe(concat('onboarding.css'))
             .pipe(gulp.dest('./dist/css'))
             .pipe(browserSync.stream())
})

gulp.task('default', ['serve'])