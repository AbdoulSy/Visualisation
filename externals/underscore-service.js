(function() {
  'use strict';
  angular.module('visualizer.externals')
    .service('visualizer.externals.underscore', textFitService);

  textFitService.$inject = ['$window'];

  function textFitService($window) {
    return $window._;
  }
})();
