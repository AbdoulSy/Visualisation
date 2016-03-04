/* global angular */
(function() {
  'use strict';

  angular.module('visualizer._future')
    .factory('visualizer._future.subject', ortSubjectService);

  function ortSubjectService() {

    return {
      inTriples: [],
      uuid: null,
      hasPredicates: [],
      hasObjects: [],
      context: null,
      prefix: []
    };
  }

  ortSubjectService.prototype.getPredicates = function() {
  };
  ortSubjectService.prototype.getObjects = function() {
  };

  ortSubjectService.prototype.setSubject = function() {
  };
  ortSubjectService.prototype.Predicate = function() {
  };

  ortSubjectService.prototype.isSubject = function() {
  };

  ortSubjectService.prototype.Create = function() {
  };
  ortSubjectService.prototype.Update = function() {
  };
  ortSubjectService.prototype.Delete = function() {
  };

  ortSubjectService.prototype.getContext = function() {
  };
  ortSubjectService.prototype.getPrefix = function() {
  };

})();
