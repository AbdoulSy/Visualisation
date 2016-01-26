/* global angular, d3 */
(function() {
  'use strict';
  angular.module('visualizer.graph').service('visualizer.graph.utils',
    ortGraphUtilService);

  ortGraphUtilService.$inject = [];
  function ortGraphUtilService() {

    return {
      lastNode: null,
      storeLastNode: function(lastNodeId) {
        this.lastNode = lastNodeId;
      },
      getLastNode: function() {
        return this.lastNode;
      },
      getSeparationFn: function() {
        return function(a, b) {
          return (a.parent === b.parent ? 1 : 2) / (a.depth || 1); };
      },
      getTreeLayoutSizeArray: function(treeDiameter, defaultDiameter) {
        if (isNaN(treeDiameter) && defaultDiameter) {
          return [360, defaultDiameter / 2.5];
        }
        return [360, treeDiameter / 2.5];
      },
      getProjectionFn: function() {
        return function(d) { return [d.y , d.x / 180 * Math.PI]; };
      },
      getNodeTransformFn: function() {
        return function(d) {
          return 'rotate(' + (d.x - 90) + ')translate(' + d.y  + ')'; };
      },
      getLeftPaginatorFn: function() {
        return function(d) {
          var tr = (-(d.x || 0) + 90);
          return (d.x || 0) < 180 ?
            'rotate(' + tr + ')translate(-10 32)' :
            'rotate(' + tr + ')translate(-10 32)';
        };
      },
      getRightPaginatorFn: function() {
        return function(d) {
          var tr = (-(d.x || 0) + 90);
          return (d.x || 0) < 180 ?
            'rotate(' + tr + ')translate(10 31)' :
            'rotate(' + tr + ')translate(10 31)';
        };
      },
      getSquarePaginatorRotateFn: function() {
        return function(d) {
          var tr = (-(d.x || 0) + 90);
          return (d.x || 0) < 180 ?
            'rotate(' + tr + ')translate(0)' :
            'rotate(' + tr + ')translate(0)';
        };
      },
      getTransformPosition: function(node) {
        return 'translate(' + node.x + ',' + node.y + ')';
      },
      getCircleClassFn: function(historyParentId) {
        return function(d) {
          if (d.id === historyParentId.id) {
            return 'lastVisitedCircle innerCircle';
          }else {
            return 'innerCircle';
          }
        };
      },
      getCircleFillCFn: function() {
        var color = d3.scale.category20c();
        var _this = this;
        return function(d, i) {
          if (d.isRelation === true) {
            return 'transparent';
          }
          if (d.depth === 0) {
            return 'white';
          }
          if (d.parent.abbr === 'BT') {
            return '#C7E4A5';
          }
          if (d.parent.relationColor) {
            if (_this.lastNode && d.id === _this.lastNode.id && !d.isRoot) {
              return d3.rgb(d.parent.relationColor).darker(0.5).toString();
            }else {
              return d.parent.relationColor;
            }
          }
          return color(i);
        };
      },
      getCircleStrokeWidthFn: function(historyParentId) {
        var _this = this;
        return function(d) {
          if (historyParentId && d.id === historyParentId.id &&
              !d.isRoot) {
            return '2';
          } else if (_this.lastNode && d.id === _this.lastNode.id &&
              !d.isRoot) {
            return '3.5';
          }else {
            return '1.4px';
          }
        };
      },
      getLinkStrokeFn: function() {
        return function(d) {
          var color;
          var source = d.source;
          var  target = d.target;

          if (source.depth === 0) {
            color = d3.rgb(target.relationColor);
            if (target.abbr === 'BT') {
              color = d3.rgb('#81c139');
            }
            return color.darker().toString();
          } if (source.isRelation) {
            color = d3.rgb(source.relationColor);
            if (source.abbr === 'BT') {
              color = d3.rgb('#81c139');
            }
            return color.darker().toString();
          }
        };
      },
      getCircleStrokeCFn: function() {
        var _this = this;
        return function(d) {
          if (d.isRelation === true) {
            return 'transparent';
          }
          if (d.depth === 0) {
            return '#666';
          }
          if (d.parent.abbr === 'BT') {
            return '#6da330';
          }
          if (d.parent.relationColor) {
            if (_this.lastNode && d.id === _this.lastNode.id  && !d.isRoot) {
              return d3.rgb(d.parent.relationColor).darker(0.5).toString();
            }else {
              return d3.rgb(d.parent.relationColor).darker(0.3).toString();
            }
          }
          return d.color || '#AAA';
        };
      },
      getMouseOverEventFn: function() {
        return function mouseinFn(d) {
          var parent = d3.select(this);
          var mySelf = parent.select('.innerCircle');

          if (d.doesPaginate ||
              navigator.appVersion.indexOf('MSIE 10') !== -1 ||
              navigator.appVersion.indexOf('Trident') !== -1) {
            parent.moveToFront();
            return false;
          }
          if (d.isRelation) {
            return false;
          }
          if (parseInt(mySelf.attr('r'), 10) === 53) {
            return false;
          }
          parent.moveToFront();
          mySelf.transition().duration(150).attr('r', 53);
        };
      },
      getMouseOutEventFn: function() {
        return function mouseoutFn(d) {
          var parent = d3.select(this);
          var mySelf = parent.select('.innerCircle');

          if (d.doesPaginate ||
              navigator.appVersion.indexOf('MSIE 10') !== -1  ||
              navigator.appVersion.indexOf('Trident') !== -1) {
            return false;
          }

          mySelf.transition().duration(150).attr('r', 50);
        };
      },
      getCircleFillFn: function() {
        return function(d) {
          return d.color || '#AAA';
        };
      },
      arrowLeftRotationFn: function() {
        return function() {
          return 'rotate(' + 0 + ')translate(' + 0 + ',' + 0 + ')';};
      },
      arrowRightRotationFn: function() {
        return function() {
          return 'rotate(' + 0 + ')translate(' + 0 + ',' + 0 + ')';};
      },
      getCircleStrokeFn: function() {
        return function(d) {
          return (d.color && d.color !== 'transparent') ?
            d.color :
            (d.linkColor ? 'transparent' : '#EEE');
        };
      },
      getPagerPlacementFn: function() {
        return function(d) {
          var tr = (-(d.x || 0) + 90);
          if (d.x === 0) {
            return (d.x || 0) < 180 ?
            'rotate(' + tr + ')translate(6 -10)' :
            'rotate(' + tr + ')translate(6 -10)';
          }
          return (d.x || 0) < 180 ? 'rotate(' + tr + ')translate(7 25)' :
            'rotate(' + tr + ')translate(7 25)';
        };
      },
      getPagerListerPlacementFn: function() {
        return function(d) {
          var tr = (-(d.x || 0) + 90);
          if (d.x === 0) {
            return (d.x || 0) < 180 ?
              'rotate(' + tr + ')translate(-44 -10)' :
              'rotate(' + tr + ')translate(-44 -10)';
          }
          return (d.x || 0) < 180 ?
            'rotate(' + tr + ')translate(-43 25)' :
            'rotate(' + tr + ')translate(-43 25)';
        };
      },
      getPagerTextPlacementFn: function() {
        return function(d) {
          var tr = (-(d.x || 0) + 90);
          if (d.x === 0) {
            return (d.x || 0) < 180 ?
              'rotate(' + tr + ')translate(6 -10)' :
              'rotate(' + tr + ')translate(6 -10)';
          }
          return (d.x || 0) < 180 ?
            'rotate(' + tr + ')translate(7 25)' :
            'rotate(' + tr + ')translate(7 25)';
        };
      },
      getTextPlacementFn: function() {
        return function(d) {
          if (d.x === 180) {
            if (!d.isSlanted) {
              return 'rotate(-90)translate(-30,-20)';
            } else {
              return 'rotate(-135)translate(-30,-20)';
            }
          }
          if (!d.isSlanted) {
            return d.x < 180 ?
              'rotate(' + (-1 * d.x - 270) + ')translate(-30,-20)' :
              'rotate(' + (-1 * d.x - 270) + ')translate(-30,-20)';
          } else {
            return d.x < 180 ?
              'rotate(' + (-1 * d.x - 315) + ')translate(-30,-20)' :
              'rotate(' + (-1 * d.x - 315) + ')translate(-30,-20)';
          }
        };
      },
      getTextPlacementFn2: function() {
        return function(d) {
          if (d.x === 180) {
            if (!d.isSlanted) {
              return 'rotate(-90)translate(-40,-40)';
            } else {
              return 'rotate(-135)translate(-40,-40)';
            }
          }
          if (!d.isSlanted) {
            return d.x < 180 ?
              'rotate(' + (-1 * d.x - 270) + ')translate(-40,-40)' :
              'rotate(' + (-1 * d.x - 270) + ')translate(-40,-40)';
          } else {
            return d.x < 180 ?
              'rotate(' + (-1 * d.x - 315) + ')translate(-40,-40)' :
              'rotate(' + (-1 * d.x - 315) + ')translate(-40,-40)';
          }
        };
      },
      getTextAnchorFn: function() {
        return function(d) { return d.x < 180 ? 'middle' : 'middle'; };
      }
    };
  }
})();
