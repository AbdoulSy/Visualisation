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
        'components/visualizer/templates/visualizer-aside-panel.html',
      scope: {
        content: '=content',
        manager: '=contentManager'
      },
      link: function($scope) {
        $scope.openCommentsSection =  function() {
          $rootScope.$emit('willOpenCommentsSection');
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
