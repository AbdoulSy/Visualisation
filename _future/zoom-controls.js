/* global angular */
(function() {
  'use strict';
  angular.module('visualizer._future')
    .directive('visualizer._future.zoomControls', ortZoomControlsDirective);

  function ortZoomControlsDirective() {
    return {
      restrict: 'E',
      templateUrl: 'components/visualizer/templates/_future.zoom-controls.html'
    };
  }
})();
