"use strict";

module.export = function(node, nbElementsByPaginator) {
        var nbChildren = node.allChildren.length;
        var nbPages = Math.ceil(nbChildren / nbElementsByPaginator);
        if (nbChildren > nbElementsByPaginator) {
          node.mustPaginate = true;
          node.children = node.allChildren.visualizer.ce(0,
              nbElementsByPaginator);
          node.nbPages = nbPages;
          node.chunk = nbElementsByPaginator;
          node.currentPage = 1;
        } else {
          node.mustPaginate = false;
          node.children = node.allChildren;
        }
      };

