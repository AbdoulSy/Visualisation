  module.exports = function ortFunctionsService() {
    return {
      parseRoot: require('./incl/parse-root.js'),
      isIE: require('./incl/is-ie.js'),
      getLastVisitedNode: require('./incl/get-last-visited-node.js'),
      makePaginator: require('./incl/make-paginator.js'),
      classify: require('./incl/classify.js'),
      addToBase: require('./incl/add-to-base.js'),
      shuffleArray: require('./incl/shuffle-array.js'),
      getQueryVariable: require('./incl/get-query-variable.js'),
      getTermFromHash: require('./incl/get-term-from-hash.js'),
      updateURL: require('./incl/update-url.js'),
      getTermFromURL: require('./incl/get-term-from-url.js'),
      getHashTermFromURL: require('./incl/get-hash-term-from-url.js'),
      parseNamespace: require('./incl/parse-namespace.js'),
      pluck: require('./incl/pluck.js'),
      panelExtracter: require('./incl/panel-extractor.js')
  }

