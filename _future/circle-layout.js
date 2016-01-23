/* global angular */
(function() {
  'use strict';

  angular.module('visualizer._future')
    .service('visualizer._future.circleLayout', ortLayoutCircleService);

  function ortLayoutCircleService() {

    return {
      getData: function() {},
      setData: function() {},
      init: function() {},
      update: function() {},
      render: function() {},
      tick: function() {},
      getAlgorithm: function() {},
      getDocs: function() {}
    };
  }
})();

