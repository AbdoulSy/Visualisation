"use strict";

module.exports = function (scope, element) {
  Templating.init(element);
  var storedData;

   scope.$on('ui.layout.resize', function() {
      if (storedData && storedData.name && storedData.children) {
        Templating.render(storedData, scope);
      }
   });
   scope.$on('ui.layout.toggle', function() {
      if (storedData && storedData.name && storedData.children) {
        Templating.render(storedData, scope);
      }
   });
   scope.$watch('data', function(newData) {
      if (newData && newData.name && newData.children) {
         storedData = newData;
         Templating.render(newData, scope);
      } else {
           //Templating.render({name: "Loading...", children: []}, scope);
      }
   });
};
