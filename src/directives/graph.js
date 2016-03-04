"use strict";
var Adapter = ('../core/adapters');

module.exports = function graphDirective() {
  var dir = new Adapter('angular', 'directive');
  dir.bindScope('data', '=chartData')
     .setTemplate('graph.html')
     .setLinker('./incl/graph-linker.js');
  return dir;
};

/**
return {
  restrict: 'E',
  template: htmlReader('../templates/graph.html'),
  scope: {
    data: '=chartData'
  },
  link: require("./incl/graph-linker.js");
}; 
*/
