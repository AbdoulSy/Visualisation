  var visualizerGraphDirective = require('directives/visualizer-graph');
  var visualizerAsideDirective = require('directives/visualizer-aside');
  var visualizerDirectivesModule = angular.module('visualizer.directives', []);

  visualizerDirectivesModule.directive('visualizerGraph', visualizerGraphDirective);
  visualizerDirectivesModule.service('visualizerAside', visualizerAsideDirective);
  module.exports = visualizerConfigModule;
   
