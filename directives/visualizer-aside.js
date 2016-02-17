
  module.exports = function($rootScope, $window) {
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
          $rootScope.$emit('wom.visualizer.will-open-comments-section');
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
  };


