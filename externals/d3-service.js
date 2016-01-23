(function() {
  'use strict';
  angular.module('visualizer.externals')
    .factory('visualizer.externals.d3', d3Service);

  d3Service.$inject = ['$window'];

  function d3Service($window) {
    return $window.d3;
  }
})();
