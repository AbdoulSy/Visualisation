  function visualizerDevRulersService($window, ortGraphSettings) {
    return {
      /** @memberof visualizer.dev:rulers
       *  @param {DOMElement} svgContainer
       *  @param {number} width
       *  @param {number} height
       *  @description renders the rulers for the entire graph
       *  Beneficial for seeing the graph virtual boundaries
       *  Only if settings.devMode are true
       */
      render: function(svgContainer, width, height) {
        var midWidth = width / 2;
        var midHeight = height / 2;

        if (ortGraphSettings.devMode) {
          svgContainer.append('path')
           .attr('fill', 'none')
           .style('stroke', 'red')
             .attr('d', function() {
               return 'M ' + width + ' 0 ' + 'L' + ' 0' + ' ' + height ;
             });
          svgContainer.append('path')
           .attr('fill', 'none')
           .style('stroke', 'red')
             .attr('d', function() {
               return 'M ' + '0 ' + '0 ' + 'L' + width + ' ' + height ;
             });
          svgContainer.append('rect')
           .attr('fill', 'transparent')
           .attr('width',  width)
           .style('stroke', 'red')
           .attr('height', height);

          svgContainer.append('circle')
           .attr('r', midHeight)
           .attr('fill', 'transparent')
           .attr('stroke', 'green')
           .attr('cx', midWidth)
           .attr('cy', midHeight);
        }
      },
      /** @memberof visualizer.dev:rulers
       *  @param {d3.selection} node the node
       *  @description renders a blue rectangle around every virtual node
       *  beneficial to see the nodes boundaries
       *  Only if settings.devMode are true
       */
      renderForNode: function(node) {
        if (ortGraphSettings.devMode) {
          node.append('rect')
          .attr('ort-circle', '')
          .style('stroke', 'blue')
          .style('fill', 'transparent')
          .attr('width', 2)
          .attr('height', 2)
          .transition()
          .duration(500)
          .attr('x', -1 * ortGraphSettings.circle.radius)
          .attr('y', -1 * ortGraphSettings.circle.radius)
          .attr('height', (ortGraphSettings.circle.radius * 2))
          .attr('width', (ortGraphSettings.circle.radius * 2));
        }
      },
      /**
       * @memberof visualizer.dev:rulers
       * @param {*} arguments... anything to be logged
       * @description Logs only if on dev mode
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
     exports = module.exports = visualizerDevRulersService;
   }
   exports.visualizerDevRulersService = visualizerDevRulersService;
 }
