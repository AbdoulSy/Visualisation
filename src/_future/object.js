/* global angular */
(function() {
  'use strict';

  angular.module('visualizer._future')
    .factory('visualizer._future.object', ortObjectService);

  function ortObjectService() {

    return {
      inTriples: [],
      uuid: null,
      hasSubjects: [],
      hasPredicates: [],
      context: null,
      prefix: []
    };

  }

  ortObjectService.prototype.getSubjects = function() {
  };
  ortObjectService.prototype.getPredicates = function() {
  };

  ortObjectService.prototype.setPredicate = function() {
  };
  ortObjectService.prototype.Object = function() {
  };

  ortObjectService.prototype.isObject = function() {
  };

  ortObjectService.prototype.Create = function() {
  };
  ortObjectService.prototype.Update = function() {
  };
  ortObjectService.prototype.Delete = function() {
  };

  ortObjectService.prototype.getContext = function() {
  };
  ortObjectService.prototype.getPrefix = function() {
  };
})();
