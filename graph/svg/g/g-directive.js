/* global angular, d3 */
(function() {
  'use strict';
  angular.module('visualizer.graph.svg').directive('slGraphSvgG',
    ortGDirective);

  ortGDirective.$inject = ['visualizer.graph.svg.node',
    'visualizer.graph.layoutHelpers'];
  function ortGDirective(nodeService, layoutHelpers) {
    return {
      restrict: 'CA',
      templateNamespace: 'svg',
      scope: {
        data: '=chartData'
      },
      link: function(scope, iElement, iAttrs) {
        scope.currentWidth = iAttrs.width;
        scope.currentHeight = iAttrs.height;
        var a = d3.selectAll(iElement);
        a.on('click', _.debounce(function(f) {

          if (f.isRelation || f.isRoot) {
              return false;
          } else {
            //nodeService.navigateTo(f, scope); for use in genentech
            //TODO create navigation service configurable in adapters
            f.willCollapse = true;

            layoutHelpers.collapse(this, function() {
               nodeService.changeStateTo(f);
             });
          }
        }));
      }
    };
  }
})();
