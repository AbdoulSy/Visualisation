/* global angular */
(function() {
  'use strict';

  angular.module('visualizer._future')
    .factory('visualizer._future.predicate', ortPredicateService);

  function ortPredicateService() {

    return {
      inTriples: [],
      uuid: null,
      hasSubjects: [],
      hasObjects: [],
      context: null,
      prefix: []
    };
  }

  ortPredicateService.prototype.getSubjects = function() {
  };
  ortPredicateService.prototype.getObjects = function() {
  };

  ortPredicateService.prototype.setPredicate = function() {
  };
  ortPredicateService.prototype.Object = function() {
  };

  ortPredicateService.prototype.isPredicate = function() {
  };

  ortPredicateService.prototype.Create = function() {
  };
  ortPredicateService.prototype.Update = function() {
  };
  ortPredicateService.prototype.Delete = function() {
  };

  ortPredicateService.prototype.getContext = function() {
  };
  ortPredicateService.prototype.getPrefix = function() {
  };

})();
