/* global angular */
(function() {
  'use strict';

  angular.module('visualizer.dev').service('visualizer.dev.console',
    ortConsoleService);

  ortConsoleService.$inject = ['$window', 'visualizer.config.settings'];

  function ortConsoleService($window, ortGraphSettings) {
    return {
      lc: function(msg, css) {
        if (ortGraphSettings.devMode) {
          var coloredMessage = '%c ' + JSON.stringify(msg);
          var cssStylesBackground = css && css.background ?
                css.background : '#FFF';
          var cssStylesColor = css && css.color ? css.color : '#000';

          var messageColor = 'background:' + cssStylesBackground + '; ' +
               'color:' + cssStylesColor + ';';

          $window.console.log(coloredMessage, messageColor, msg);
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
