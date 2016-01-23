(function() {
  'use strict';
  angular.module('visualizer.externals')
    .service('visualizer.externals.URI', uRIService);

  uRIService.$inject = ['$window'];

  function uRIService($window) {
    return $window.URI;
  }
})();
