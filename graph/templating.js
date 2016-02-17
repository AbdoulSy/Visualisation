module.exports = function ortGraphTemplatingService(ortSettings, vis, $window) {

    return {
      //the list of elements
      el: null,
      processedData: null,
      settings: _.extend({
        width: 590,
        height: 590
      }, ortSettings.graph.templating),
      g: null,
      //the layout object instance (d3.layout)
      layout: null,
      //extends the ortSettings configuration object with the attributes
      //takes the scope of the element to be $compiled
      init: function(element) {
        this.el = angular.element(element).find('.graphDesignContainer');
        if (this.settings.height !== 'dynamic') {
          this.el.css({height: this.settings.height});
        } else {
          this.el.css({height: $window.innerHeight - 150});
          // -150 because of the navigation bars and footer
        }
        //this.initiateLoader(this.el, $scope);
      },
      initiateLoader: function(el, $scope) {
        vis.renderLoader(el, $scope);
      },
      //visual rendering
      render: function(data, $scope) {
        var processedData = (data);
        var _this = this;
        _this.update(processedData, $scope);
        angular.element($window).bind('resize', _.debounce(function() {
          if (_this.settings.height === 'dynamic') {
            _this.el.css({height: $window.innerHeight - 150});
            // -150 because of the navigation bars and footer
          }
          _this.update(_this.processedData, $scope);
        }));
      },

      update: function(processedData, $scope) {
        vis.render(this.el, $scope, processedData);
        this.processedData = processedData;
      }
    };
  };
