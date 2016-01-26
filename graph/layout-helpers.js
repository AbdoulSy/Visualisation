/* global angular, d3, textFit  */
(function() {
  'use strict';
  angular.module('visualizer.graph')
    .service('visualizer.graph.layoutHelpers', graphLayoutHelpers);

  graphLayoutHelpers.$inject = ['$compile',
    'visualizer.config.settings', 'visualizer.graph.utils',
    'visualizer.dev.rulers', 'visualizer.functions.functions',
    'visualizer.graph.paginator'];
  //todo implement when the backend is implemented
  function graphLayoutHelpers($compile,
    ortGraphSettings, graphUtils, rulers, Functions)  {

    return {

      centerNode: null,

      collapse: function(node, callback) {
        var gnode = d3.select(node);
        var rootNode = this.centerNode;

        d3.selectAll('.link')
          .transition()
          .duration(function(d) {
            if (d.target.depth === 2) {
              return 500;
            } else if (d.target.depth === 1) {
              return 250;
            } else {
              return 100;
            }
          }).attr('d',
            d3.svg.diagonal.radial().projection(function(d) {
              return [d.y , d.x / 180 * Math.PI];
            })({source: rootNode, target: rootNode})
          );

        var anode = d3.selectAll('.node').filter(function(d) {
          return !d.willCollapse;
        });
        anode.transition()
        .duration(1000)
          .attr('transform', function() {
              return 'rotate(' + Math.random() * 360 + ')translate(1000, 1000)';
            });

        gnode.transition()
          .duration(1000)
          .delay(300)
          .attr('transform', function(d) {
            return 'rotate(' + (d.x - 90) + ')translate(0)';
          });

        gnode.attr('fill', 'white')
          .call(callback);

      },

      //Creates a data container.
      // takes vis (d3 SVG element), & data for nodes
      createContainer: function(vis, data, $scope, rootNode) {
        this.centerNode = rootNode;
        function doTheTransitionAnimated() {
          a.attr('transform',
              'rotate(' + (-1 * rootNode.x) + ')translate(' + rootNode.y + ')')
            .transition()
            .duration(500)
            .attr('transform', graphUtils.getNodeTransformFn());
        }

        function doTheTransitionFast() {
          a.attr('transform', function(d) {
            if (d.parent && d.parent.willPaginatePrev) {
              return 'rotate(' + (d.x - 90) + ')translate(' + d.y  + ')';
            } else {
              return 'rotate(' + (d.x - 90) + ')translate(' + d.y  + ')';

            }
          })
            .style('opacity', function(d) {
            if (d.depth < 2) {
              return 1;
            } else {
              return 0;
            }
          })
            .transition()
            .duration(500)
            .style('opacity', 1)
            .attr('transform', function(d) {
              return 'rotate(' + (d.x - 90) + ')translate(' + d.y  + ')'; })
            ;
        }

        var el = vis.selectAll('.node')
          .data(data); //todo differenciate between initialization and update

        var a = el.enter().append('g')
          .attr('sl-graph-svg-g', '')
          .classed('gElement', true)
          .attr('class', function(d) {
            var defaultClass = 'node';
            var finalClass = defaultClass;
            if (d.isRelation) {
              finalClass = finalClass + ' relationship-node';
            }
            return finalClass;
          })
          .on('mouseover', graphUtils.getMouseOverEventFn())
          .on('mouseout', graphUtils.getMouseOutEventFn());

        $compile(angular.element('g[sl-graph-svg-g]'))($scope);

        if (!rootNode.endedContainerAnimation) {
          doTheTransitionAnimated();
          rootNode.endedContainerAnimation = true;
        } else {
          a.attr('transform', graphUtils.getNodeTransformFn());
          doTheTransitionFast();
        }

        return a;
      },
      //adds a click event and management on a d3 Node
      addClickEventOn: function(node) {
        node.attr('xlink:href', function() {
            return '#';
          });
      },

      //Creates a circle.
      createCircle: function(node, rootNode) {
        rulers.renderForNode(node);
        var historyParentId = Functions.getLastVisitedNode();
        var a;
        function doTheTransitionAnimated() {
          a.attr('r', 2)
            .transition()
            .duration(500)
            .attr('r', ortGraphSettings.circle.radius);
        }

        function doTheTransitionFast() {
          a.attr('r', ortGraphSettings.circle.radius)
            .transition()
            .duration(250)
            .style('r', '50');
        }
        a = node.append('circle')
        .attr('visualizer.graph-svg-circle', '')
        .attr('class', graphUtils.getCircleClassFn(historyParentId))
        .style('fill', graphUtils.getCircleFillCFn())
        .style('stroke', graphUtils.getCircleStrokeCFn(historyParentId))
        .style('stroke-width',
            graphUtils.getCircleStrokeWidthFn(historyParentId));

        if (!rootNode.endedCircleAnimation) {
          doTheTransitionAnimated();
          rootNode.endedCircleAnimation = true;
        } else {
          doTheTransitionFast();
        }

        return a;

      },

      //creates a Link
      createLink: function(vis, linkData, linkShape, rootNode) {
        function doTheTransitionAnimated() {
          a.attr('d', linkShape({source: rootNode, target: rootNode}))
            .transition()
            .duration(function(d) {
              if (d.target.depth === 2) {
                return 500;
              } else if (d.target.depth === 1) {
                return 250;
              } else {
                return 100;
              }
            }).attr('d', linkShape);
        }

        function doTheTransitionFast() {

          a.style('opacity',  function(d) {
            if (d.source.doesPaginate === true &&
                d.source.willPaginateNext === true) {

              d.target.x = d.target.x + 10;
              return 0;
            } else if (d.source.doesPaginate === true &&
                 d.source.willPaginatePrev) {

              d.target.x = d.target.x - 10;
              return 0;
            } else {
              return 1;
            }
          })
            .transition()
            .duration(200)
            .delay(50)
            .style('opacity', 1)
            .attr('d', linkShape);
        }
        var a = vis.selectAll('.link')
          .data(linkData)
          .enter().append('path')
          .attr('class', 'link')
          .style('stroke-width', '2.5px')
          .style('stroke', graphUtils.getLinkStrokeFn());

        if (!rootNode.endedLinkAnimation) {
          doTheTransitionAnimated();
          rootNode.endedLinkAnimation = true;
        } else {
          doTheTransitionFast();
        }

        return a;
      }
    };

  }

})();
