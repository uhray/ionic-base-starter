var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var replace = require('gulp-replace-task');
var args = require('yargs').argv;
var fs = require('fs');
var path = require('path');
var child = require('child_process');

var paths = {
  sass: ['./scss/**/*.scss'],
  config: ['./config/*.js'],
  semantic: ['./semantic/**/**', './semantic.json']
};

gulp.task('default', ['sass', 'config']);

gulp.task('semantic', function(cb) {
  child.spawn('gulp', ['build'], { cwd: __dirname + '/semantic' })
    .on('close', cb);
});

gulp.task('config', function(done) {
  var env = args.env || 'local',
      fn = './config/' + env + '.js',
      config = require('./config/' + env + '.js'),
      json, str, k;
      k;

  // override with env variables
  for (k in process.env) if (config[k]) config[k] = process.env[k];

  // Create config.js file
  json = JSON.stringify(config),
  str = `angular.module('starter').constant('appConfig', ${json})`,

  // clear cache
  delete require.cache[path.join(__dirname, fn)];

  // write out
  fs.writeFileSync('./www/js/config.js', str);

  // done
  done();
});

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.config, ['config']);
  gulp.watch(paths.semantic, ['semantic']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
