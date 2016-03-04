  var visualizerSemaphoreDataService =  require('./data-manager');
  var visualizerSemaphoreModule = {
      services: {},
      service: function (name, fn) {
        this.services[name] = fn;
     }
  };

  visualizerSemaphoreModule.service('visualizer.semaphore.data', visualizerSemaphoreDataService);

  if(typeof exports !== 'undefined') {
    if(typeof module !== 'undefined' && module.exports) {
      exports = module.exports = visualizerSemaphoreModule;
    }
    exports.visualizerSemaphoreModule= visualizerSemaphoreModule;
  }
