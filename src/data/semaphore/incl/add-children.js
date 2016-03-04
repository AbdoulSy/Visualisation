"use strict";
module.exports = function(parent, rootData, structure) {
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
};
