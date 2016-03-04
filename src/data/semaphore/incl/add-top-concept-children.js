"use strict";
module.exports = function(parent, topConcept, relationColor) {
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
};

