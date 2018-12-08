'use strict';

const gulp   = require('gulp');
const plugins = require('gulp-load-plugins')();

const paths = {
  lint : ['./*.js', '!gulpfile.js'],
  watch : ['gulpfile.js', './foreclosure.js', './test/**/*.js', '!test/{temp,temp/**}'],
  tests : ['./test/**/*.js', '!test/{temp,temp/**}']
};

const plumberConf = {};

if (process.env.CI) {
  plumberConf.errorHandler = function(err) {
    throw err;
  };
}

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('lint', function(done) {
  return gulp.src(paths.lint)
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    // .pipe(plugins.eslint.failAfterError());
});

gulp.task('mocha', function() {
  return gulp.src(paths.tests)
    .pipe(plugins
      .mocha({
      reporter : 'spec',
      bail : true
    })
      .on("error", handleError));
});

gulp.task('watch', function() {
  gulp.watch(paths.watch, gulp.series('test'));
});

gulp.task('test', gulp.series('lint', 'mocha'));

gulp.task('default', gulp.series(gulp.parallel('test', 'watch')));
