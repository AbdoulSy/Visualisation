"use strict";
     /**
       * Adds all elements in a section into a children array
       *
       * @param  {object} base        the root node
       * @param  {string} retrievalTerm   the retrieval term
       * @param  {string} termClassName   the term class name
       * @return {Number} countFrom       pagination offset
       */
module.exports = function(base, retrievalTerm, termClassName, countFrom) {
        var i;
        var count = 0;
        var paginatorLength = 10;
        if (countFrom) {
          count = countFrom;
        }
        //two level depth retrieval system
        for (i in retrievalTerm) {
          var ii;
          var currentTerm;
          var termNode;
          var classifiedAttrs;

          currentTerm = retrievalTerm[i];
          classifiedAttrs = this.classify(currentTerm, termClassName);

          termNode = {
            name: currentTerm.name,
            abbr: currentTerm.abbr,
            nodeClass: 'linker ' + classifiedAttrs.name,
            classifiedIndex: classifiedAttrs.id,
            qty: currentTerm.qty,
            type: 'association',
            children: [],
            allChildren: []
          };
          base.push(termNode);

          for (ii in currentTerm.fields) {
            var theField = currentTerm.fields[ii].field;
            theField.parent = termNode;

            var classifiedNodeClass = this.classify(theField,
                termClassName + 'Child');
            termNode.allChildren.push({
              name: theField.name,
              parent: theField.parent,
              nodeClass: termClassName + ' ' +
              classifiedNodeClass.name + ' ' +
              classifiedNodeClass.name + '-' + classifiedNodeClass.id,
              href: theField.id,
              uri: theField.uri
            });
            count++;
          }

          this.makePaginator(termNode, paginatorLength);

        }
        return count;

      };

