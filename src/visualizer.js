  'use strict';
  var _ = require('lodash');
  var angular = require('angular');
  var a = {
    
  config: require('./config'),
  dev :require('./dev'),
  functions: require('./functions'),
  graph:require('./graph'),
  ses: require('./ses'),
  semaphore: require('./semaphore'),
  errors: require('./errors')
  };

  var modularized = [];
  _.mapObject(a, function (key, val) {
    modularized[key] =
  });

module.exports = a;

