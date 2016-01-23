/* global angular */
(function() {
  'use strict';

  angular.module('visualizer.graph').service('visualizer.graph.vis',
    visService);

  visService.$inject = ['$compile', 'visualizer.externals.d3',
    'visualizer.config.settings', 'visualizer.dev.rulers',
    'visualizer.graph.layout', '$timeout'];

  function visService($compile, d3,
  ortSettings, rulerComponent, treeLayout, $timeout) {
    return {
      ref: null,
      settings: _.extend({
        width: 590,
        height: 590
      }, ortSettings.graph.templating),
      layout: treeLayout.maybeInit(ortSettings.graph.templating.height),
      renderLoader: function(el) {
        var svgContainer;
        var width = this.settings.width === 'dynamic' ?
              el.width() : this.settings.width;
        var height = this.settings.height === 'dynamic' ?
              el.height() : this.settings.height;
        var  midWidth = width / 2;
        var midHeight = height / 2;

        svgContainer = d3.select(el.find('svg#svgLoader')[0])
            .attr('width', width)
            .attr('height', height)
            .classed('d3Bounded', true);
        svgContainer.selectAll(':not(.defs)').remove();
        var loaderContainer = svgContainer.append('g')
                .attr('x', midWidth)
                .attr('y', midHeight)
                .attr('transform',
                    'translate(' + midWidth + ',' + midHeight + ')');
        loaderContainer.append('svg:image')
             .attr('width', '25')
             .attr('height', '25')
             .attr('transform', 'translate(-12,-12)')
             .attr('xlink:href',
               ortSettings.assets.svg.directory  + '/loading-spin.svg');
      },
      destroyLoader: function() {
        var svgLoader = d3.select('svg#svgLoader');
        svgLoader.transition()
            .duration(600)
            .style('display', 'none');
      },
      render: function(el, $scope, processedData) {
        var g;
        var svgContainer;
        var width = this.settings.width === 'dynamic' ?
                  el.width() : this.settings.width;
        var height = this.settings.height === 'dynamic' ?
            el.height() : this.settings.height;
        var midWidth = width / 2;
        var midHeight = height / 2;

        svgContainer = d3.select(el.find('svg#svgContainer')[0])
          .attr('width', width)
          .attr('height', height)
          .attr('sl-graph-svg-svg', 'true')
          .classed('d3Bounded', true);
        svgContainer.selectAll(':not(.defs)').remove();
        rulerComponent.render(svgContainer, width, height);
        g = svgContainer.append('g')
              .attr('x', midWidth)
              .attr('y', midHeight)
          .attr('transform',
              'translate(' + midWidth + ',' + midHeight  + ')');
        $compile(svgContainer[0][0])($scope);
        this.ref = g;
        this.layout = treeLayout.render(null, g, processedData, $scope);
        return g;
      },
      getLayout: function() {
        return this.layout;
      },
      clear: function() {
        this.ref.selectAll('*').remove();
      },
      get: function() {
        return this.ref;
      },
      adjustCanvas: function() {
        $timeout(_.debounce(function() {
          $(window).trigger('resize');
        }));
      }
    };
  }

})();
