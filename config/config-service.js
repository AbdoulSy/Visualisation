/* global angular, d3 */
(function() {
  'use strict';
  /** @namespace visualizer.config */
  angular.module('visualizer.config').service('visualizer.config.config',
    configurationService);
  configurationService.$inject = ["visualizer.config.settings"];
  //jscs:disable requireDotNotation
  function configurationService(settings) {
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
  }
})();
