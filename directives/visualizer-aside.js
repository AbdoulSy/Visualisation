/* global angular*/
(function() {
  'use strict';
  angular.module('visualizer.directives').directive('visualizerAside',
    asidePanelDirective);

  asidePanelDirective.$inject = ['$rootScope', '$window'];
  function asidePanelDirective($rootScope, $window) {
    return {
      restrict: 'E',
      templateUrl:
        'bower_components/smartlogic-visualisation/templates/visualizer-aside-panel.html',
      scope: {
        content: '=content',
        manager: '=contentManager'
      },
      link: function($scope) {
        $scope.openCommentsSection =  function() {
          //FIXME: make the name of the event configurable
          $rootScope.$broadcast('wom.visualizer.will-open-comments-section');
        };
        $scope.openMailTo = function() {
          $window.location = 'mailto:?subject=' + 'Model review: ' +
            $scope.content.details['meta:displayName']['@value'] +
            '&body=' +
            'Someone has shared with you a concept to review at:\n' +
            $window.location.href;
        };

      }
    };
  }
})();
