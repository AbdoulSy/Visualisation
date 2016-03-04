  var visualizerErrorsService = require('./errors');

  var visualizerErrorsModule = {
      services: {},
      service: function (name, fn) {
        this.services[name] = fn;
     }
  };

  visualizerErrorsModule.service('visualizer.errors.errors', visualizerErrorsModule);
  module.exports = visualizerErrorsModule;
   
