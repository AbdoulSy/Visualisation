module.exports =  function graphLayoutService(ortGraphSettings,
    ortHelpers, nodeService, graphUtils, PaginatorManager, TextManager) {

    return {
      tree: null,
      defaultDiameter: 590,
      initialized: false,
      linkShape: null,
      getLayout: function() {
        return this.tree;
      },
      resolveUsedDimension: function(width, height) {
        var ratio = width / height;

        if (isNaN(ratio) || ratio > 1) {
          return height;
        } else {
          return width;
        }
      },
      maybeInit: function(treeDiameter) {
        if (!this.initialized) {
          this.tree = d3.layout.tree()
              .size(graphUtils.getTreeLayoutSizeArray(treeDiameter,
                    this.defaultDiameter))
              .separation(graphUtils.getSeparationFn());
          nodeService.init();
          this.initialized = true;
        }
        if (!this.linkShape) {
          this.linkShape = this.createLinkShape();
        }
        d3.selection.prototype.moveToFront = function() {
          return this.each(function() {
            this.parentNode.appendChild(this);
          });
        };
        return this.tree.size(
            graphUtils.getTreeLayoutSizeArray(treeDiameter))
                .separation(graphUtils.getSeparationFn());
      },
      render: function(overrideDiameter, element,
                  processedData, $attachedScope) {

        if (ortGraphSettings.diameter === 'dynamic') {
          var $el = angular.element(element[0]).parent();
          //depending on which is smaller between width or height,
          //the smallest value will be used as diameter
          var dimensionForDiameter = this.resolveUsedDimension(
              $el.innerWidth(), $el.innerHeight());
          this.maybeInit(dimensionForDiameter, this.defaultDiameter);
        } else {
          this.maybeInit(overrideDiameter, this.defaultDiameter);
        }
        this.stylesAndData(element, processedData, $attachedScope);
        return this.tree;
      },
      createLinkShape: function() {
        return d3.svg.diagonal.radial()
          .projection(graphUtils.getProjectionFn());
      },
      //Creates the node styles and data
      stylesAndData: function(vis, processedData, $scope) {
        var updatedData = processedData;
        var layout = this.tree;
        var linkShape = this.linkShape;
        $scope.$on('paginator.paginate', function(e, d) {
          _.each(updatedData, function(item, el) {
                if (el === 'children') {
                  _.each(item, function(innerItem) {

                    if (innerItem && d.data && innerItem.abbr === d.data.abbr) {
                      innerItem.page = d.page;
                      innerItem.willPaginate  = d.willPaginate;
                      innerItem.willPaginatePrev  = d.willPaginatePrev;
                      innerItem.willPaginateNext  = d.willPaginateNext;
                    }
                  });
                }
              });
          vis.selectAll('*').remove();
          update(updatedData);
        });
        function update(data) {
          if (!data) {
            return false;
          }
          var iNode;
          var iLink;
          var nodeData;
          var linkData;
          var paginatedData;

          paginatedData = PaginatorManager.prepare(data);
          nodeData = layout.nodes(data);
          linkData = layout.links(nodeData);
          iLink = ortHelpers.createLink(vis, linkData, linkShape, data);
          //we use the first level of data as root node
          iNode = ortHelpers.createContainer(vis, nodeData, $scope, data);
          ortHelpers.createCircle(iNode, data);
          TextManager.createNodeContents(nodeService.getMode(), iNode);
          PaginatorManager.init(iNode, nodeData, $scope);

        }
        this.data = updatedData;
        update(updatedData);

        return vis;
      }
    };
  }
