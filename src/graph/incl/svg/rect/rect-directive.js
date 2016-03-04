module.exports = function ortRectDirective() {
    return {
      restrict: 'CA',
      templateNamespace: 'svg',
      scope: {
        data: '=chartData'
      },
      link: function(scope, iElement, iAttrs) {
        scope.width = iAttrs.width;
        scope.height = iAttrs.height;
      }
    };
  }

