/* global angular, d3 */
(function() {
  'use strict';
  angular.module('visualizer.graph').service('visualizer.graph.paginator',
    nodePaginatorService);

  nodePaginatorService.$inject = [
    'visualizer.config.settings', 'visualizer.graph.paginatorHelpers',
    'visualizer.graph.text', 'visualizer.graph.utils'];
  //todo implement when the backend is implemented
  function nodePaginatorService(ortGraphSettings, Helpers, Text, Utils) {

    return {
      settings: _.extend({
        circleRadius: 40
      }, ortGraphSettings.graph.paginator),
      prepare: function(data) {
        data.isRoot = true;
        return Helpers.paginateData(data, Helpers);
      },
      init: function(node, nodeData, $scope) {
        node.select('.paginator,.paginatorElement').remove();
        var maxNb = this.settings.maxNbOfChildLeaves;
        var paginator = node.append('g').attr('class', function(d) {

          if (d.isRelation && d.allChildren && d.allChildren.length > maxNb) {
            return 'paginatorElement';
          } else {
            return 'paginator';
          }
        });

        paginator.append('rect')
        .classed('paginatorCircle', true)
        .attr('width', this.settings.circleRadius * 2)
        .attr('height', this.settings.circleRadius * 2)
        .attr('x', -1 * this.settings.circleRadius)
        .attr('y', -1 * this.settings.circleRadius)
        .attr('rx', 10)
        .attr('ry', 10)
        .attr('transform', Utils.getSquarePaginatorRotateFn())
        .style('stroke', function(f) {
          return d3.rgb(f.relationColor).darker();
        })
        .style('stroke-width', '2px')
        .style('fill', function(f) {
          return d3.rgb(f.relationColor);
        });

        Text.createNodeContents('foreignObject',paginator);

        var paginatorPager = paginator.append('g')
          .attr('class','paginatorPager')
          .attr('id', function(d){
            return 'paginator_' + d.relationColor;
          })
          .on('click', function() {
            var parentNode = d3.select(this.parentNode);
            var lister = parentNode.select('.paginatorPageLister');
            lister.classed('shown', !lister.classed('shown'));
          })
          .attr('transform', Utils.getPagerPlacementFn());

        paginatorPager.append('rect')
          .attr('width', 50)
          .attr('rx', 5)
          .attr('ry', 5)
          .attr('transform', 'translate(-32 -7)')
          .attr('fill', '#efefef')
          .attr('height', 25);

        paginatorPager.append('text')
          .attr('width', 50)
          .attr('height', 25)
          .attr('transform', 'translate(-8 11)')
          .style('text-anchor', 'middle')
          //.attr('transform', 'translate(-20 7)')
          .text(function(d) {
            return d.page + ' / ' + d.nbPages;
          });

        var list = paginator.append('g')
          .attr('class','paginatorPageLister')
          .append('foreignObject')
            .attr('transform',  Utils.getPagerListerPlacementFn())
            .attr('class', 'textNode')
            .attr('width', (ortGraphSettings.circle.diameter))
            .attr('height', 200)
            .attr('x','20')
            .attr('y','30')
            .attr('rx', 5)
            .attr('ry', 5)
            .append('xhtml:div')
              .attr('class','node-page-lister')
              .append('xhtml:ul').html(function(d) {
                var res = '';
                var u = '';
                for (var i = 0, j = 0; i < d.nbPages; i++) {
                  j = i + 1;
                  if (parseInt(d.page, 10) === j) {
                    u = 'currentPage';
                  } else {
                    u = '';
                  }
                  res = res +
                   '<li id=\'paginatorPage_' + d.relationColor + '\' class=\'paginatorPage ' + u + '\'>' + j + '</li>';
                }
                return res;
              });

        list.selectAll('li.paginatorPage')
          .on('click', function() {
          var data = d3.select(this.parentNode).datum();
          $scope.$emit('paginator.paginate', {
            page: this.textContent,
            colorId:  data.relationColor,
            data: data
          });
        });

        var paginateLeftButton = paginator.append('g')
            .attr('class', 'paginate-arrow paginate-prev')
            .attr('transform', Utils.getLeftPaginatorFn());

        paginateLeftButton.append('svg:image')
           .attr('xlink:href',
               ortGraphSettings.assets.svg.directory  + '/arrow-left.svg')
           .attr('width', 20)
           .attr('height', 20)
           .attr('cursor', 'pointer')
           .attr('transform', Utils.arrowLeftRotationFn())
           .attr('x', -38)
           .attr('y', -11)
            .style('opacity', function(d) {
              if (d.page > 1) {
                return 1;
              } else {
                return 0;
              }
            })
            .on('mousedown', function() {
              d3.event.stopPropagation();
            }).on('mousedown.paginateLeft', function(d) {
              if (d.page > 1) {
                //$window.location.href = uri;
                $scope.$emit('paginator.paginate', {
                    page: (parseInt(d.page, 10) - 1),
                    colorId: d.relationColor,
                    willPaginatePrev: true,
                    willPaginateNext: false,
                    willPaginate: true,
                    data: d
                  });
              }
            });

        var paginatorRightButton = paginator.append('g')
        .attr('class', 'paginate-arrow paginate-next')
        .attr('transform', Utils.getRightPaginatorFn());

        paginatorRightButton.append('svg:image')
        .attr('xlink:href',
            ortGraphSettings.assets.svg.directory  + '/arrow-right.svg')
        .attr('width', 20)
        .attr('height', 20)
        .attr('transform', Utils.arrowRightRotationFn())
        .attr('cursor', 'pointer')
        .attr('x', 17)
        .attr('y', -10)
        .style('opacity', function(d) {
            if (!d.isLastPage) {
              return 1;
            } else {
              return 0;
            }
          })
        .on('mousedown', function() {
          d3.event.stopPropagation();
        }).on('mousedown.paginateRight', function(d) {

          if (!d.isLastPage) {
            //$window.location.href = uri;
            $scope.$emit('paginator.paginate', {
                page: (1 + parseInt(d.page, 10)),
                willPaginatePrev: false,
                colorId: d.relationColor,
                willPaginateNext: true,
                willPaginate: true,
                data: d
              });
          }
        });
      }
    };
  }

})();
