  'use strict';
  require('modules/config-module');
  require('modules/dev-module');
  require('modules/functions-module');
  require('modules/graph-module');
  require('modules/server-module');
  var angular = require('angular');

  var visualizerModule = angular.module('visualizer', [
    'visualizer.config',
    'visualizer.dev',
    'visualizer.functions',
    'visualizer.graph',
    'visualizer.server',
  ]);

 if(typeof exports !== 'undefined') {
   if(typeof module !== 'undefined' && module.exports) {
     exports = module.exports = visualizerModule;
   }
   exports.visualizerModule = visualizerModule;
 }
