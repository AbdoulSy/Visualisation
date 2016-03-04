module.exports = function ortDataManagerService(ortFunctionsService, ortConsole) {
    return {

      /**
       * @description creates a d3 ready set of nodes and links
       * @memberof visualizer.semaphore:data
       * @param {object} inputData
       * @returns {parsed|*}
       */
      parse: require('./incl/parse.js'),
      /**
       * @description Adds children to the current concept viewed
       * @memberof visualizer.semaphore:data
       * @param {object} parent
       * @param {object} rootData
       * @param {object} structure
       */
      addChildren: require('./incl/add-children.js'),

      /**
       * @description Adds topConcept nodes and links to a concept parent
       * @memberof visualizer.semaphore:data
       * @param {object} parent
       * @param {object} topConcept
       * @param {string} relationColor
       */
      addTopConceptAsChildren: require('./incl/add-top-concept-children.js'),
      /**
       * @description Adds nodes and links to a node
       * that has a skos:related array of children
       *
       * @memberof visualizer.semaphore:data
       * @param {object} parent
       * @param {object} narrowerChildren
       * @param {strign} relationColor
       */
      addNarrowerChildren: require('./incl/add-narrower-children.js'),

      /**
       * @description Adds nodes and links to a node
       * that has a skos:related array of children
       *
       * @memberof visualizer.semaphore:data
       * @param {object} parent
       * @param {object} relatedChildren
       * @param {string} relationColor
       */
      addRelatedChildren: require('./incl/add-related-children.js'),

      /**
       * @description Adds nodes and links to a node
       * that has a skos:related array of children
       * @memberof visualizer.semaphore.data
       * @param {object} parent
       * @param {object} broaderChildren
       * @param {string} relationColor
       */
      addBroaderChildren: require('./incl/add-broader-children.js'),
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
      addSpecialChildren: require('./incl/add-special-children.js'),
    };
  };
