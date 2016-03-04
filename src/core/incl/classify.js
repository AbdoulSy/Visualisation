"use strict";
module.export = (function() {
        var classified = {};
        var closedI = 0;
        var parseAbbr = function(abbrString) {
          var parsed;
          abbrString = abbrString || 'X';
          parsed = abbrString.replace(/(\s|\.)/g, '_');
          parsed = parsed.replace(/\(|\)/g, '');
          return parsed;
        };
        var classifyFn = function(term, className) {
          var parsedAbbr;
          if (!classified[className]) {
            classified[className] = {};
          }
          if (term.abbr) {
            parsedAbbr = parseAbbr(term.abbr);
            if (!classified[className][parsedAbbr]) {
              classified[className][parsedAbbr] = {
                id: ++closedI,
                name: className + ' ' + className + '-' + closedI +
                  ' ' + className + '-' + parsedAbbr
              };
              term.classifiedIndex = closedI;
            }
            return classified[className][parsedAbbr];
          }
          if (term.name && !term.abbr && term.parent) {
            parsedAbbr = parseAbbr(term.parent.abbr);
            if (!classified[className][parsedAbbr]) {
              if (!term.parent.classifiedIndex) {
                term.parent.classifiedIndex = ++closedI;
              }
              term.classifiedIndex = term.parent.classifiedIndex;
              var ci = term.classifiedIndex;
              var modularClassifiedIndex = ci % 40;
              classified[className][parsedAbbr] = {
                id: ci,
                name: className + ' ' + className + '-' +
                  modularClassifiedIndex + ' ' + className + '-' + parsedAbbr
              };
            }
            return classified[className][parsedAbbr];
          }
          return {
            id: 0,
            name: 'root'
          };

        };

        return classifyFn;
})();

