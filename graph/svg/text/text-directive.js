module.exports = function ortTextDirective() {
    return {
      restrict: 'CA',
      templateNamespace: 'svg',
      scope: {
        data: '=chartData'
      }
    };
  };
