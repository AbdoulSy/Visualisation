  var visualizerConfigService = function(settings) {
    return {
       settings: settings,
       getAll: function () {
         return this.settings;
       },
       get: function (name) {
         return this.settings[name];
       },
       is: function (name) {
          return !!this.settings[name];
       },
       set: function(key, val) {
           this.settings[key] = val;
           return this;
       }
     };
  };

 if(typeof exports !== 'undefined') {
   if(typeof module !== 'undefined' && module.exports) {
     exports = module.exports = visualizerConfigService;
   }
   exports.visualizerConfigService = visualizerConfigService;
 }
