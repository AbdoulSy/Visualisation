"use strict";
module.exports = function(parent, specialChildren,
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

};

