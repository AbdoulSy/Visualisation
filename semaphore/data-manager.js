/* global angular, _, d3*/
(function(angular, _, d3) {
  'use strict';
  angular.module('visualizer.server').service('visualizer.semaphore.data',
    ortDataManagerService);

  ortDataManagerService.$inject = ['visualizer.functions.functions',
   'visualizer.dev.console'];
  function ortDataManagerService(ortFunctionsService, ortConsole) {
    return {

      /**
       * creates a d3 ready set of nodes and links
       *
       * @param {object} inputData
       * @returns {parsed|*}
       */
      parse: function(inputData, structure, nameFetcherFn) {
        this.nameFetcher = nameFetcherFn;
        var parsed = {
          name: this.nameFetcher(inputData),
          href: '',
          id: inputData['@id'],
          isRoot: true,
          depth: 1,
          x: 0,
          y: 0,
          children: []
        };
        ortConsole.lc(inputData, {color: 'cyan'});
        this.addChildren(parsed, inputData, structure);
        return parsed;
      },
      /**
       * Adds children to the current concept viewed
       *
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
                this.nameFetcher(item), color(index));
            }
          });
        }
      },

      /**
       * Adds topConcept nodes and links to a concept parent
       *
       * @param {object} parent
       * @param {object} topConcept
       * @param {string} relationColor
       */
      addTopConceptAsChildren: function(parent, topConcept, relationColor) {
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
                name: this.nameFetcher(child),
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
       * Adds nodes and links to a node
       * that has a skos:related array of children
       *
       * @param {object} parent
       * @param {object} narrowerChildren
       * @param {strign} relationColor
       */
      addNarrowerChildren: function(parent, narrowerChildren, relationColor) {
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
                name: this.nameFetcher(child),
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
       * Adds nodes and links to a node
       * that has a skos:related array of children
       *
       * @param {object} parent
       * @param {object} relatedChildren
       * @param {string} relationColor
       */
      addRelatedChildren: function(parent, relatedChildren, relationColor) {
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
                 name: this.nameFetcher(child),
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
       * Adds nodes and links to a node
       * that has a skos:related array of children
       *
       * @param {object} parent
       * @param {object} broaderChildren
       * @param {string} relationColor
       */
      addBroaderChildren: function(parent, broaderChildren, relationColor) {
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
                name: this.nameFetcher(child),
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
       * Adds nodes and links to a node
       * that has a special array of children
       *
       * @param {object} parent
       * @param {object} specialChildren
       * @param {string} name
       * @param {string} relationColor
       */
      addSpecialChildren: function(parent, specialChildren,
                              name, relationColor) {
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
                name: this.nameFetcher(child),
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
