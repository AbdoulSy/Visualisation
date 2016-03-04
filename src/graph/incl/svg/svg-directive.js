module.exports = function ortSvgDirective(nodeService) {
    return {
      restrict: 'A',
      templateNamespace: 'svg',
      scope: {
        data: '=chartData'
      },
      link: function(scope, iElement, iAttrs) {
        scope.currentWidth = iAttrs.currentWidth;
        scope.currentHeight = iAttrs.currentHeight;
        scope.nodeId = iAttrs.nodeId;
        nodeService.launchFeatureDetection();
      }
    };
  };

