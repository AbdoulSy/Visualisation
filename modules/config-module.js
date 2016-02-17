  var settingsValue = require('config/settings');
  var configService = require('config/config-service');

  var visualizerConfigModule = angular.module('visualizer.config', []);

  visualizerConfigModule.value('visualizer.config.settings', settingsValue);

  visualizerConfigModule.service('visualizer.config.config', configService);

  if(typeof exports !== 'undefined') {
    if(typeof module !== 'undefined' && module.exports) {
      exports = module.exports = visualizerConfigModule;
    }
    exports.visualizerConfigModule= visualizerConfigModule;
  }
