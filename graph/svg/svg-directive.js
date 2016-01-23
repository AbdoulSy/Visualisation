/* global angular */
(function() {
  'use strict';
  angular.module('visualizer.graph.svg').directive('slGraphSvgSvg',
    ortSvgDirective);

  ortSvgDirective.$inject = ['visualizer.graph.svg.node'];
  function ortSvgDirective(nodeService) {
    return {
      restrict: 'A',
      templateNamespace: 'svg',
      scope: {
        data: '=chartData'
      },
      link: function(scope, iElement, iAttrs) {
        scope.currentWidth = iAttrs.currentWidth;
        scope.currentHeight = iAttrs.currentHeight;
        scope.nodeId = iAttrs.nodeId;
        nodeService.launchFeatureDetection();
      }
    };
  }
})();
