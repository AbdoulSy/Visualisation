"use strict";
module.exports = function(parent, relatedChildren, relationColor) {
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

};
