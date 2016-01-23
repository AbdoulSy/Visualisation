/* global angular */
(function() {
  'use strict';

  angular.module('visualizer._future')
    .factory('visualizer._future.triple', ortTripleService);

  function ortTripleService() {

    return {
      tripleObject: null,
      uuid: null,
      subject: null,
      predicate: null,
      object: null,
      context: null,
      table: null,
      prefixes: null
    };
  }

  ortTripleService.prototype.getSubject = function() {
  };
  ortTripleService.prototype.getPredicate = function() {
  };
  ortTripleService.prototype.getObject = function() {
  };

  ortTripleService.prototype.setSubject = function() {
  };
  ortTripleService.prototype.setPredicate = function() {
  };
  ortTripleService.prototype.setObject = function() {
  };

  ortTripleService.prototype.isTriple = function() {
  };
  ortTripleService.prototype.setTriple = function() {
  };

  ortTripleService.prototype.create = function() {
  };
  ortTripleService.prototype.update = function() {
  };
  ortTripleService.prototype.delete = function() {
  };

  ortTripleService.prototype.getContext = function() {
  };
  ortTripleService.prototype.getPrefixes = function() {
  };

})();
