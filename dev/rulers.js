/* global angular, d3 */
(function() {
  'use strict';

  angular.module('visualizer.dev').service('visualizer.dev.rulers',
    rulersService);

  rulersService.$inject = ['$window',
   'visualizer.config.settings'];

  function rulersService($window, ortGraphSettings) {
    return {
      render: function(svgContainer, width, height) {
        var midWidth = width / 2;
        var midHeight = height / 2;

        if (ortGraphSettings.devMode) {
          svgContainer.append('path')
           .attr('fill', 'none')
           .style('stroke', 'red')
             .attr('d', function() {
               return 'M ' + width + ' 0 ' + 'L' + ' 0' + ' ' + height ;
             });
          svgContainer.append('path')
           .attr('fill', 'none')
           .style('stroke', 'red')
             .attr('d', function() {
               return 'M ' + '0 ' + '0 ' + 'L' + width + ' ' + height ;
             });
          svgContainer.append('rect')
           .attr('fill', 'transparent')
           .attr('width',  width)
           .style('stroke', 'red')
           .attr('height', height);

          svgContainer.append('circle')
           .attr('r', midHeight)
           .attr('fill', 'transparent')
           .attr('stroke', 'green')
           .attr('cx', midWidth)
           .attr('cy', midHeight);
        }
      },
      renderForNode: function(node) {
        if (ortGraphSettings.devMode) {
          node.append('rect')
          .attr('ort-circle', '')
          .style('stroke', 'blue')
          .style('fill', 'transparent')
          .attr('width', 2)
          .attr('height', 2)
          .transition()
          .duration(500)
          .attr('x', -1 * ortGraphSettings.circle.radius)
          .attr('y', -1 * ortGraphSettings.circle.radius)
          .attr('height', (ortGraphSettings.circle.radius * 2))
          .attr('width', (ortGraphSettings.circle.radius * 2));
        }
      },
      log: function() {
        if (ortGraphSettings.devMode) {
          $window.console.log(arguments.slice.call());
        }
      }
    };
  }

})();
