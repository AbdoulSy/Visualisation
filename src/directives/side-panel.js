  "use strict";
var Adapter = ('../core/adapters');

module.exports = function sidePanelDirective() {
  var dir = new Adapter('angular', 'directive');
  dir.bindScope('content', '=content')
     .bindScope('manager', '=contentManager')
     .setTemplate('side-panel.html')
     .setLinker('./incl/side-panel-linker.js');
  return dir;
};

/**
  var htmlReader = require('../core/file-to-html.js');
  module.exports = function($rootScope, $window) {
    return {
      restrict: 'E',
      template: htmlReader('../templates/visualizer-aside-panel.html'),
      scope: {
        content: '=content',
        manager: '=contentManager'
      },
      link: function($scope) {
        
      }
    };
  };
*/
