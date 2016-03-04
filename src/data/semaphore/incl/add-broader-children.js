"use strict";
module.exports = function(parent, broaderChildren, relationColor) {
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

};

