"use strict";

module.export = function(data) {
        if (data.parameters.service === 'term') {
          var root = data.terms[0].term;
          var nbElementsAfterHierarchy;
          var hierarchy = root.hierarchy;
          var associated = root.associated;

          root.children = [];
          nbElementsAfterHierarchy = this.addToBase(root.children,
              hierarchy, 'hierarchy');
          this.addToBase(root.children, associated, 'association',
              nbElementsAfterHierarchy);
          return root;
        }
        return false;
};
