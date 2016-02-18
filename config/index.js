  var settingsValue = require('./settings');
  var configService = require('./config-service');
  var visualizerConfigModule = {
      values: {},
      services: {},
      value: function (name, fn) {
        this.values[name] = fn;
     }, service: function (name, fn) {
        this.services[name] = fn;
     }
  };

  visualizerConfigModule.value('visualizer.config.settings', settingsValue);

  visualizerConfigModule.service('visualizer.config.config', configService);

  if(typeof exports !== 'undefined') {
    if(typeof module !== 'undefined' && module.exports) {
      exports = module.exports = visualizerConfigModule;
    }
    exports.visualizerConfigModule= visualizerConfigModule;
  }
