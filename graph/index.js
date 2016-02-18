  var visualizerSvgModule = require('./svg');
  var visualizerGraphUtilsService = require('./utils');
  var visualizerGraphTextService = require('./text');
  var visualizerGraphLayoutService = require('./layout');
  var visualizerGraphPaginatorHelpersService = require('./paginator-helpers');
  var visualizerGraphPaginatorService = require('./paginator');
  var visualizerGraphTemplatingService = require('./templating');
  var visualizerGraphVisualisationService = require('./vis');
  var visualizerGraphMetadataPanelService = require('./metadata-panel');
  var visualizerGraphModule = {
      directives: {},
      services: {},
      directive : function (name, fn) {
        this.directives[name] = fn;
     }, service: function (name, fn) {
        this.services[name] = fn;
     }
  };
  visualizerGraphModule.service('visualizer.graph.utils', visualizerGraphUtilsService);
  visualizerGraphModule.service('visualizer.graph.text', visualizerGraphTextService);
  visualizerGraphModule.service('visualizer.graph.templating', visualizerGraphTemplatingService);
  visualizerGraphModule.service('visualizer.graph.layout', visualizerGraphLayoutService);
  visualizerGraphModule.service('visualizer.graph.paginatorHelpers', visualizerGraphPaginatorHelpersService);
  visualizerGraphModule.service('visualizer.graph.paginator', visualizerGraphPaginatorService);
  visualizerGraphModule.service('visualizer.graph.vis',visualizerGraphVisualisationService);
  visualizerGraphModule.service('visualizer.graph.metadataPanel', visualizerGraphMetadataPanelService);

  module.exports = visualizerGraphModule;
