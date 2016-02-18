  var visualizerFunctionsService = require('./functions');

  var visualizerFunctionsModule = {
      services: {},
      service: function (name, fn) {
        this.services[name] = fn;
     }
  };

  visualizerFunctionsModule.service('visualizer.functions.functions', visualizerFunctionsModule);
  module.exports = visualizerFunctionsModule;
   
