  module.exports = function ortFunctionsService() {
    return {
      parseRoot: function(data) {
        var root = {};
        var terms = [];
        var i;
        if (data.parameters.service === 'browse') {
          root.name = data.parameters.tbdb;
          root.nodeClass = 'root';
          root.href = false;
          root.children = [];
          terms = data.terms;
          for (i in terms) {
            root.children.push({
              nodeClass: 'rootChildren',
              name: terms[i].term.name,
              href: terms[i].term.id,
              uri: terms[i].term.uri
            });
          }
          return root;
        }

      },

      isIE: function() {
        return (navigator.appVersion.indexOf('MSIE 10') !== -1 ||
        navigator.appVersion.indexOf('Trident') !== -1);
      },

      getLastVisitedNode: function() {
        var search = {};
        if (search.ch && typeof search.ch === 'string') {
          return {id: search.ch};
        }else {
          return {id: null};
        }
      },

      parseLeaves: function(data) {
        if (data.parameters.service === 'term') {
          var root = data.terms[0].term;
          var nbElementsAfterHierarchy;
          var hierarchy = root.hierarchy;
          var associated = root.associated;

          root.children = [];
          nbElementsAfterHierarchy = this.addToBase(root.children,
              hierarchy, 'hierarchy');
          this.addToBase(root.children, associated, 'association',
              nbElementsAfterHierarchy);
          return root;
        }
        return false;

      },

      makePaginator: function(node, nbElementsByPaginator) {
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
      },

      classify: (function() {
        var classified = {};
        var closedI = 0;
        var parseAbbr = function(abbrString) {
          var parsed;
          abbrString = abbrString || 'X';
          parsed = abbrString.replace(/(\s|\.)/g, '_');
          parsed = parsed.replace(/\(|\)/g, '');
          return parsed;
        };
        var classifyFn = function(term, className) {
          var parsedAbbr;
          if (!classified[className]) {
            classified[className] = {};
          }
          if (term.abbr) {
            parsedAbbr = parseAbbr(term.abbr);
            if (!classified[className][parsedAbbr]) {
              classified[className][parsedAbbr] = {
                id: ++closedI,
                name: className + ' ' + className + '-' + closedI +
                  ' ' + className + '-' + parsedAbbr
              };
              term.classifiedIndex = closedI;
            }
            return classified[className][parsedAbbr];
          }
          if (term.name && !term.abbr && term.parent) {
            parsedAbbr = parseAbbr(term.parent.abbr);
            if (!classified[className][parsedAbbr]) {
              if (!term.parent.classifiedIndex) {
                term.parent.classifiedIndex = ++closedI;
              }
              term.classifiedIndex = term.parent.classifiedIndex;
              var ci = term.classifiedIndex;
              var modularClassifiedIndex = ci % 40;
              classified[className][parsedAbbr] = {
                id: ci,
                name: className + ' ' + className + '-' +
                  modularClassifiedIndex + ' ' + className + '-' + parsedAbbr
              };
            }
            return classified[className][parsedAbbr];
          }
          return {
            id: 0,
            name: 'root'
          };

        };

        return classifyFn;
      })(),

      /**
       * Adds all elements in a section into a children array
       *
       * @param  {object} base        the root node
       * @param  {string} retrievalTerm   the retrieval term
       * @param  {string} termClassName   the term class name
       * @return {Number} countFrom       pagination offset
       */
      addToBase: function(base, retrievalTerm, termClassName, countFrom) {
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

      },

      shuffleArray: function shuffle(array) {
        var currentIndex = array.length;
        var temporaryValue;
        var randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
      },

      getQueryVariable: function(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');
        var i = 0;
        var pair;
        var len = vars.length;
        for (i = 0; i < len; i++) {
          pair = vars[i].split('=');
          if (decodeURIComponent(pair[0]) === variable) {
            return decodeURIComponent(pair[1]);
          }
        }
        return false;
      },

      getTermFromHash: function() {
        var term = window.location.hash || '' ;
        return term.replace('#','');
      },

      updateURL: function(payload) {
        window.location.hash = payload.href;
      },

      getTermFromURL: function(variableName, ifTermFound, ifNoTermsFound) {
        var term = this.getQueryVariable(variableName);
        if (term) {
          if (typeof ifTermFound === 'function') {
            ifTermFound(term, true);
          }
        } else {
          if (typeof ifNoTermsFound === 'function') {
            ifNoTermsFound();
          }
        }
      },

      getHashTermFromURL: function(variableName, ifTermFound, ifNoTermsFound) {
        var term = this.getTermFromHash(variableName);
        if (term) {
          if (typeof ifTermFound === 'function') {
            ifTermFound(term, true);
          }
        } else {
          if (typeof ifNoTermsFound === 'function') {
            ifNoTermsFound();
          }
        }
      },

      parseNamespace: function(base, ns, parseKey) {
        //declarations
        var nsParts;
        var i;
        var partsLen;
        //assignments
        parseKey = parseKey || ':';
        nsParts = ns.split(parseKey);
        partsLen = nsParts.length;
        //loop_operation
        for (i = 0; i < partsLen; i = i + 1) {
          if (typeof base[nsParts[i]] === 'undefined') {
            base[nsParts[i]] = {};
          }
          base = base[nsParts[i]];
        }

      },

      pluck: function(element, name) {
        var eqList = element[name] || false;
        var returnList = [];
        _.each(eqList, function(eq) {
          var plucked = _.pluck(eq.fields, 'field');
          returnList = returnList.concat(plucked);
        });

        return returnList;
      },

      panelExtracter: function(data) {
        if (data.parameters.service === 'browse') {
          var terms = data.terms;
          var i;
          var root = {
              children: []
            };

          for (i in terms) {
            root.children.push({
              name: terms[i].term.name,
              href: terms[i].term.id,
              uri: terms[i].term.uri
            });
          }
          return {
            name: data.parameters.tbdb,
            type: 'Ontology Root Name',
            children: root.children
          };
        }
        if (data.parameters.service === 'term') {
          var node = data.terms[0].term;
          return {
            name: node.name,
            type: 'Term',
            className: node['class'],
            href: node.id,
            useFor: this.pluck(node, 'equivalence'),
            children: node.children
          };
        }
      }
    };
  }

