  var visualizerSesDataService =  require('./data-manager');
  var visualizerSesProcessorService =  require('./processor');
  var visualizerSesModule = {
      services: {},
      service: function (name, fn) {
        this.services[name] = fn;
     }
  };

  visualizerSesModule.service('visualizer.ses.data', visualizerSesDataService);
  visualizerSesModule.service('visualizer.ses.processor', visualizerSesProcessorService);

  if(typeof exports !== 'undefined') {
    if(typeof module !== 'undefined' && module.exports) {
      exports = module.exports = visualizerSesModule;
    }
    exports.visualizerSesModule= visualizerSesModule;
  }
