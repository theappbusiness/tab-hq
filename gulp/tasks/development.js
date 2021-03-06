'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('dev', ['clean'], function(callback) {

  callback = callback || function() {};

  global.isProd = false;

  // Run all tasks once
  return runSequence(['nodemon', 'imagemin', 'browserify', 'jscs', 'copyFonts', 'copyCss', 'copyIndex', 'copyIcons'], 'watch', callback);

});
