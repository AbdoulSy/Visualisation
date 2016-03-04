module.exports = function nodePaginatorHelpersService(ortGraphSettings) {

    return {
      conf: _.extend({
        maxNbOfChildLeaves: 5,
        minNbOfChildLeaves: 2, //I don't recommend more, it will drain
        //the performances
        mode: 'progressive' //@asy:todo implement the strict mode
      }, ortGraphSettings.graph.paginator), //the settings on settings.js
      //override these ones
      /*
       * Helpers Used Mostly to determine what would be the most even
       * number of nodes to show on each page @todo use the surrounding nodes
       * as a factor
       * @Algorithm_Description
       * The page number -1 * the max num of nodes defined in the
       * settings
       * this.settings.maxNbOfChildLeaves (default:10)
       * If there is more than 10 child nodes, we do a progressive pagination
       * If there is 13 children, we do an euclidian division by two, until
       * The result is less than the max Nb of child nodes
       * example a: 13 div 2 = 6:1 , 6 is less than 10
       * if the remainder (13%2) is more than 0, but more than the min number
       * of child leaves we add a page to the nbOfPages
       * value.
       *
       * example 1: pageLength = 10 , nbElems = 15
       *
       * page = 1
       * result = Math.floor(15/2) = 7
       * remainder = 15 % 2 = 1
       * --2nd iteration
       *     result = Math.floor(15/3) = 5
       *     remainder = remainder = 15 % 3 = 0
       *
       * rightBound = page * iter.result = 1 * 5 = 5
       * leftBound = (page - 1) * iter.result = 0
       * It is used to get the [leftBound, rightBound] [0, 5] first elements
       *
       * example 2: pageLength 10, nbElems = 17
       * page = 4
       *
       * result = calculated (see above) = 5
       * remainder = calculated (see above) = 2
       * nbOfPages = 3 + 1 (due to remainder)
       * rightBound = 4 * 5 = 20
       * leftBound = (4 - 1) * 10 = 15
       *
       * if the rightBound is bigger than the nbOfElements
       * we Assign the right bound to the number of Elements
       *
       * either way, finally, we substract 1 off the right Bound as a js array
       * is indexed from 0
       */
      inferPaginationShape: function inferPaginationShape(nbElems, divisor,
        target, overrides) {

        divisor = divisor || 2;
        var result;
        var remainder;
        var minNum;
        var finalNbPages;
        var calculatedNbPages;
        var maxNum;
        minNum = (overrides && overrides.min) ?
          overrides.min : target.conf.minNbOfChildLeaves;
        maxNum = (overrides && overrides.max) ?
          overrides.max : target.conf.maxNbOfChildLeaves;
        result = Math.floor(nbElems / divisor);
        remainder = nbElems % divisor;
        if (result <= maxNum && remainder === 0) {
          return {
            result: result,
            nbPages: divisor,
            nbElems: nbElems
          };
        } else if (divisor > remainder && nbElems < (maxNum * 3)) {
          calculatedNbPages = Math.ceil(nbElems / maxNum);
          if (remainder > 0) {
            finalNbPages = calculatedNbPages + 1;
          }
	  else {
	    finalNbPages = calculatedNbPages;  
	  }
           
          return {
            result: result,
            nbPages: finalNbPages,
            nbElems: nbElems
          };
        } else if (remainder < minNum || result > maxNum) {
          return inferPaginationShape(nbElems, (1 + divisor), target);
        } else {
          return {
            result: result,
            nbPages: (1 + divisor),
            nbElems: nbElems
          };
        }
      },
      assignBounds: function(elem, paginationShape) {
        var leftBound;
        var rightBound;

        leftBound = (elem.page - 1) * paginationShape.result;
        rightBound = elem.page * paginationShape.result;
        if (rightBound >= paginationShape.nbElems) {
          rightBound  = paginationShape.nbElems ;
          leftBound = rightBound  - paginationShape.result;
          elem.isLastPage = true;
        } else {
          elem.isLastPage = false;
        }
        elem.nbPages = paginationShape.nbPages;
        elem.leftBound = leftBound;
        elem.rightBound = rightBound;
      },
      paginateData: function recurseMap(root, target, parent) {
        var  shape;
        var maxC = target.conf.maxNbOfChildLeaves;
        var overridePage;

        if (!root.doesPaginate && root.isRelation &&
            (root.children.length > maxC)) {
          root.allChildren = angular.copy(root.children);
          root.doesPaginate = true;
          root.page = root.page || overridePage || 1;
          if (parent && parent.id === target.conf.overrideFor) {
            overridePage = {
              max: target.conf.overrideMax,
              min: target.conf.overrideMin
            };
            root.doesPaginate = false;
          }
          _.each(root.children, function(child) {
            recurseMap(child, target, root);
          });
          if (root.doesPaginate) {
            shape = root.shape = target.inferPaginationShape(
                root.allChildren.length, null, target, overridePage);
            target.assignBounds(root, shape);
            root.children = root.children.slice(root.leftBound,
                root.rightBound);
          }

        } else if (root.doesPaginate) {
          target.assignBounds(root, root.shape);
          var c = angular.copy(root.allChildren);
          root.children = c.slice(root.leftBound, root.rightBound);
        }else if (root.isRoot === true) {
          _.each(root.children, function(child) {
            recurseMap(child, target, root);
          });
        }
        return root;
      }
    };
  };
