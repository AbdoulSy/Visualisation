/* global angular */
(function() {
  'use strict';
  angular.module('visualizer.graph.svg').directive('slSvgCircle',
    ortCircleDirective);

  ortCircleDirective.$inject = [];
  function ortCircleDirective() {
    return {
      restrict: 'CA',
      templateNamespace: 'svg',
      scope: {
        data: '=chartData'
      },
      link: function(scope, iElement, iAttrs) {
        scope.radius = iAttrs.r;
        scope.parentRelation = 'None';
        scope.currentCenter = {
          'x': iAttrs.x,
          'y': iAttrs.y
        };
      }
    };
  }
})();
