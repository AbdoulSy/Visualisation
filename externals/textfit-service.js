(function() {
  'use strict';
  angular.module('visualizer.externals')
   .service('visualizer.externals.textFit', textFitService);

  textFitService.$inject = ['$window'];

  function textFitService($window) {
    return $window.textFit;
  }
})();
