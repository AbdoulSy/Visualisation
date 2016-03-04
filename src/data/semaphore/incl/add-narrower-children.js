"use strict";
module.exports = function(parent, narrowerChildren, relationColor) {
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

};
