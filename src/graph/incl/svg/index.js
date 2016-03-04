  var visualizerGraphSvgDirective = require('./svg-directive');
  var visualizerGraphSvgTextDirective = require('./text/text-directive');
  var visualizerGraphSvgRectDirective = require('./rect/rect-directive');
  var visualizerGraphSvgCircleDirective = require('./circle/circle-directive');
  var visualizerGraphSvgGDirective = require('./g/g-directive');
  var visualizerGraphSvgLinkDirective = require('./link/link-directive');
  var visualizerGraphSvgNodeService = require('./node/node-service');

  var visualizerSvgModule = {
      directives: {},
      services: {},
      directive : function (name, fn) {
        this.directives[name] = fn;
     }, service: function (name, fn) {
        this.services[name] = fn;
     }
  };

  visualizerSvgModule.directive('ortSvgDirective', visualizerGraphSvgDirective);
  visualizerSvgModule.directive('ortTextDirective', visualizerGraphSvgDirective);
  visualizerSvgModule.directive('ortRectDirective', visualizerGraphSvgDirective);
  visualizerSvgModule.directive('ortCircleDirective', visualizerGraphSvgDirective);
  visualizerSvgModule.directive('ortGDirective', visualizerGraphSvgDirective);
  visualizerSvgModule.directive('ortLinkDirective', visualizerGraphSvgDirective);
  visualizerSvgModule.service('visualizer.graph.svg.node', visualizerGraphSvgNodeService);
  
  module.exports =  visualizerSvgModule;
