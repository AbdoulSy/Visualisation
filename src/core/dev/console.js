'use strict';
/** @class visualizer.dev:console */
function visualizerDevConsoleService($window, ortGraphSettings) {
  return {
    /** @memberof visualizer.dev:console
     *  @param {object} message the message
     *  @param {object} css the css styles for the message
     */
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
     /** @memberof visualizer.dev:console
      *  @param {object} arguments... the message
      */
     log: function() {
       if (ortGraphSettings.devMode) {
         $window.console.log(arguments.slice.call());
       }
     }
    };
}

if(typeof exports !== 'undefined') {
   if(typeof module !== 'undefined' && module.exports) {
     exports = module.exports = visualizerDevConsoleService;
   }
   exports.visualizerDevConsoleService= visualizerDevConsoleService;
}
