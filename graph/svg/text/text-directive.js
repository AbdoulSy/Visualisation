/* global angular */
(function() {
  'use strict';
  angular.module('visualizer.graph.svg').directive('slGraphSvgText',
    ortTextDirective);

  ortTextDirective.$inject = [];
  function ortTextDirective() {
    return {
      restrict: 'CA',
      templateNamespace: 'svg',
      scope: {
        data: '=chartData'
      }
    };
  }
})();
