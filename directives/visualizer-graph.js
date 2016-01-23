/* global angular*/
(function() {
  'use strict';
  angular.module('visualizer.directives').directive('visualizerGraph',
    graphDirective);

  graphDirective.$inject = ['visualizer.graph.templating'];
  function graphDirective(Templating) {
    return {
      restrict: 'E',
      templateUrl: 'components/visualizer/templates/visualizer-graph.html',
      scope: {
        data: '=chartData'
      },
      link: function(scope, element) {
        Templating.init(element);
        var storedData;

        scope.$on('ui.layout.resize', function() {
          if (storedData && storedData.name && storedData.children) {
            Templating.render(storedData, scope);
          }
        });
        scope.$on('ui.layout.toggle', function() {
          if (storedData && storedData.name && storedData.children) {
            Templating.render(storedData, scope);
          }
        });
        scope.$watch('data', function(newData) {
          if (newData && newData.name && newData.children) {
            storedData = newData;
            Templating.render(newData, scope);
          } else {
            //Templating.render({name: "Loading...", children: []}, scope);
          }
        });

      }
    };
  }
})();
