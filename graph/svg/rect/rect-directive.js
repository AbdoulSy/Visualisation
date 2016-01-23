/* global angular */
(function() {
  'use strict';
  angular.module('visualizer.graph.svg').directive('slGraphSvgRect',
    ortRectDirective);

  ortRectDirective.$inject = [];
  function ortRectDirective() {
    return {
      restrict: 'CA',
      templateNamespace: 'svg',
      scope: {
        data: '=chartData'
      },
      link: function(scope, iElement, iAttrs) {
        scope.width = iAttrs.width;
        scope.height = iAttrs.height;
      }
    };
  }
})();
