/* global angular, _, d3*/
(function(angular, _, d3) {
  'use strict';
  /** @namespace visualizer.server */
  angular.module('visualizer.server').service('visualizer.semaphore.data',
    ortDataManagerService);
  /** @external visualizer.functions:functions **/
  /** @external visualizer.dev:console **/
  ortDataManagerService.$inject = ['visualizer.functions.functions',
   'visualizer.dev.console'];
  /** @class visualizer.semaphore:data **/
  function ortDataManagerService(ortFunctionsService, ortConsole) {
    return {

      /**
       * @description creates a d3 ready set of nodes and links
       * @memberof visualizer.semaphore:data
       * @param {object} inputData
       * @returns {parsed|*}
       */
      parse: function(inputData, structure, nameFetcherFn) {
        this.nameFetcher = nameFetcherFn;
        var parsed;
        if(!inputData.hasOwnProperty('parsed') || inputData['parsed'] === false) {
          parsed = {
            name: this.nameFetcher(inputData),
            href: '',
            id: inputData['@id'],
            isRoot: true,
            depth: 1,
            x: 0,
            y: 0,
            parsed: true,
            children: (inputData.children || [])
          };
          ortConsole.lc(inputData, {color: 'cyan'});
          this.addChildren(parsed, inputData, structure);
        } else {
          parsed = inputData;
        }
        return parsed;
      },
      /**
       * @description Adds children to the current concept viewed
       * @memberof visualizer.semaphore:data
       * @param {object} parent
       * @param {object} rootData
       * @param {object} structure
       */
      addChildren: function(parent, rootData, structure) {
        var index = 0;
        var color = d3.scale.category20();

        if (rootData['skos:narrower'] &&
            rootData['skos:narrower'].length > 0) {
          index = index + 1;
          this.addNarrowerChildren(parent, rootData['skos:narrower'],
              color(index));
        }
        if (rootData['skos:broader'] &&
            rootData['skos:broader'].length > 0) {
          index = index + 1;
          this.addBroaderChildren(parent,
              rootData['skos:broader'], color(index));
        }
        if (rootData['skos:hasTopConcept'] &&
            rootData['skos:hasTopConcept'].length > 0) {
          index = index + 1;
          this.addTopConceptAsChildren(parent, rootData['skos:hasTopConcept'],
              color(index));
        }

        var ctx = this;
        if (structure) {
          _.each(structure.associativeUnfilteredTypes, function(item, index) {
            index = index + 1;
            if (rootData[item['@id']] && rootData[item['@id']].length > 0) {
              ctx.addSpecialChildren(parent, rootData[item['@id']],
                ctx.nameFetcher(item), color(index));
            }
          });
        }
      },

      /**
       * @description Adds topConcept nodes and links to a concept parent
       * @memberof visualizer.semaphore:data
       * @param {object} parent
       * @param {object} topConcept
       * @param {string} relationColor
       */
      addTopConceptAsChildren: function(parent, topConcept, relationColor) {
        var ctx = this;
        parent.children.push({
          name: 'Top Concepts',
          parent: parent.id,
          color: 'transparent',
          depth: 1,
          isRelation: true,
          relationColor: '#C5EEC5',
          linkColor: '#C5EEC5',
          id: parent.id + 'topConcepts',
          children: (function() {
            var children = [];
            _.each(topConcept, function(child) {
              children.push({
                name: ctx.nameFetcher(child),
                depth: 2,
                color: relationColor,
                id: child['@id'],
                children: [],
                parent: parent.id + 'narrower'
              });
            });
            return children;
          })()
        });
      },

      /**
       * @description Adds nodes and links to a node
       * that has a skos:related array of children
       *
       * @memberof visualizer.semaphore:data
       * @param {object} parent
       * @param {object} narrowerChildren
       * @param {strign} relationColor
       */
      addNarrowerChildren: function(parent, narrowerChildren, relationColor) {
        var ctx = this;
        parent.children.push({
          name: 'Narrower',
          parent: parent.id,
          color: 'transparent',
          isRelation: true,
          relationColor: '#C5EEC5',
          linkColor: '#C5EEC5',
          id: parent.id + 'narrower',
          children: (function() {
            var children = [];
            _.each(narrowerChildren, function(child) {
              children.push({
                name: ctx.nameFetcher(child),
                depth: 2,
                color: relationColor,
                id: child['@id'],
                children: [],
                parent: parent.id + 'narrower'
              });
            });
            return children;
          })()
        });

      },

      /**
       * @description Adds nodes and links to a node
       * that has a skos:related array of children
       *
       * @memberof visualizer.semaphore:data
       * @param {object} parent
       * @param {object} relatedChildren
       * @param {string} relationColor
       */
      addRelatedChildren: function(parent, relatedChildren, relationColor) {
        var ctx = this;
        parent.children.push({
           name: 'related',
           parent: parent.id,
           color: 'transparent',
           isRelation: true,
           relationColor: relationColor,
           linkColor: '#6da330',
           id: parent.id + 'related',
           children: (function() {
             var children = [];
             _.each(relatedChildren, function(child) {
               children.push({
                 name: ctx.nameFetcher(child),
                 depth: 2,
                 color: relationColor,
                 id: child['@id'],
                 children: [],
                 parent: parent.id + 'related'
               });
             });
             return children;
           })()
         });

      },

      /**
       * @description Adds nodes and links to a node
       * that has a skos:related array of children
       * @memberof visualizer.semaphore.data
       * @param {object} parent
       * @param {object} broaderChildren
       * @param {string} relationColor
       */
      addBroaderChildren: function(parent, broaderChildren, relationColor) {
        var ctx = this;
        parent.children.push({
          name: 'Broader',
          parent: parent.id,
          color: 'transparent',
          isRelation: true,
          relationColor: '#DAE5EE',
          linkColor: '#DAE5EE' ,
          id: parent.id + 'broader',
          children: (function() {
            var children = [];
            _.each(broaderChildren, function(child) {
              children.push({
                name: ctx.nameFetcher(child),
                depth: 2,
                color: relationColor,
                id: child['@id'],
                children: [],
                parent: parent.id + 'broader'
              });
            });
            return children;
          })()
        });

      },

      /**
       * @description Adds nodes and links to a node
       * that has a special array of children
       *
       * @memberof visualizer.semaphore:data
       * @param {object} parent
       * @param {object} specialChildren
       * @param {string} name
       * @param {string} relationColor
       */
      addSpecialChildren: function(parent, specialChildren,
                              name, relationColor) {
        var ctx = this;
        parent.children.push({
          name: name,
          parent: parent.id,
          isRelation: true,
          color: 'transparent',
          relationColor: relationColor,
          id: parent.id + 'broader',
          children: (function() {
            var children = [];
            _.each(specialChildren, function(child) {
              children.push({
                name: ctx.nameFetcher(child),
                depth: 2,
                color: relationColor,
                id: child['@id'],
                children: [],
                parent: parent.id + name
              });
            });
            return children;
          })()
        });

      }

    };
  }

})(angular, _, d3);
