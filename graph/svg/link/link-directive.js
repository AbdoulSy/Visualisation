/* global angular */
(function() {
  'use strict';
  angular.module('visualizer.graph.svg').directive('slSvgLink',
    ortLinkDirective);

  ortLinkDirective.$inject = [];
  function ortLinkDirective() {
    return {
      restrict: 'CA',
      templateNamespace: 'svg',
      scope: {},
      link: function(scope, iElement, iAttrs) {
        scope.source = iAttrs.source;
        scope.target = iAttrs.target;
      }
    };
  }
})();
