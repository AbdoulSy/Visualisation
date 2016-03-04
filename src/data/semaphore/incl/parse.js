"use strict";
module.exports = function(inputData, structure, nameFetcherFn) {
this.nameFetcher = nameFetcherFn;
var parsed = {
  name: this.nameFetcher(inputData),
  href: '',
  id: inputData['@id'],
  isRoot: true,
  depth: 1,
  x: 0,
  y: 0,
  children: (inputData.children || [])
};
ortConsole.lc(inputData, {color: 'cyan'});
this.addChildren(parsed, inputData, structure);
return parsed;
};
