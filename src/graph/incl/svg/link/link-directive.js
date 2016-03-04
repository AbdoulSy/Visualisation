module.exports = function ortLinkDirective() {
    return {
      restrict: 'CA',
      templateNamespace: 'svg',
      scope: {},
      link: function(scope, iElement, iAttrs) {
        scope.source = iAttrs.source;
        scope.target = iAttrs.target;
      }
    };
};

