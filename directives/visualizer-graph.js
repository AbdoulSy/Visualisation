/* global angular*/
(function() {
  'use strict';
  angular.module('visualizer.directives').directive('visualizerGraph',
    graphDirective);

  graphDirective.$inject = ['visualizer.graph.templating'];
  function graphDirective(Templating) {
    return {
      restrict: 'E',
      templateUrl: 'bower_components/smartlogic-visualisation/templates/visualizer-graph.html',
      scope: {
        data: '=chartData'
      },
      link: function(scope, element) {
        //initializing the templating service
        //using the current element as container
        Templating.init(element);
        var storedData;
        //on resize, we re-render the same data
        scope.$on('ui.layout.resize', function() {
          if (storedData && storedData.name && storedData.children) {
            Templating.render(storedData, scope);
          }
        });
        //everytime the ui.layout has been toggled we re-render the stored data
        scope.$on('ui.layout.toggle', function() {
          if (storedData && storedData.name && storedData.children) {
            Templating.render(storedData, scope);
          }
        });
        scope.$watch('data', function(newData) {
          //everytime new data is $digested
          if (newData && newData.name && newData.children) {
            //if we have a valid batch of data
            storedData = newData;
            //we render the new data
            Templating.render(newData, scope);
          } else {
            //Templating.render({name: "Loading...", children: []}, scope);
          }
        });

      }
    };
  }
})();
