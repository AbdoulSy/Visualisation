'use strict';

  var consoleSrv = require('./console');
  var rulersSrv = require('./rulers');

  var visualizerDevModule = {
      services: {},
      service: function (name, fn) {
        this.services[name] = fn;
     }
  };
  visualizerDevModule.service('visualizer.dev.console', consoleSrv);
  visualizerDevModule.service('visualizer.dev.rulers', rulersSrv);

  if(typeof exports !== 'undefined') {
    if(typeof module !== 'undefined' && module.exports) {
      exports = module.exports = visualizerDevModule;
    }
    exports.visualizerDevModule= visualizerDevModule;
  }
