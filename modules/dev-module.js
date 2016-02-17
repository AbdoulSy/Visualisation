'use strict';

  var consoleSrv = require('dev/console');
  var rulersSrv = require('dev/rulers');

  var visualizerDevModule = angular.module('visualizer.dev', []);

  visualizerDevModule.service('visualizer.dev.console', consoleSrv);
  visualizerDevModule.service('visualizer.dev.rulers', rulersSrv);

  if(typeof exports !== 'undefined') {
    if(typeof module !== 'undefined' && module.exports) {
      exports = module.exports = visualizerDevModule;
    }
    exports.visualizerDevModule= visualizerDevModule;
  }
