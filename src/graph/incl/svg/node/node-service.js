module.exports = function ortNodeService($window, ortConsole, $state, Utils) {

    return {
      mode: 'foreignObject',
      modes: ['foreignObject', 'textFit'],
      getMode: function() {
        return this.mode;
      },
      goTo: function(query) {
        var u = new URI($window.location.href);
        u.search(query);
        $window.location.href = u;

      },
      init: function() {
        var target = this;
        $('.filter-list-form').on('submit', function() {
          target.goTo($(this).serialize());
        });
      },
      changeStateTo: function(node) {
        Utils.storeLastNode(node.parent.parent);
        if ($state.current.name.indexOf('conceptScheme') !== -1) {
          //when selecting a node from the concept Scheme
          //go to the concept immediately
          $state.go(
              'models.model.tasks.task.concepts.details.concept.visualizer',
              {itemUri: node.id});

        } else {
          $state.go('.',{itemUri: node.id});
        }
      },
      navigateTo: function(node) {
        var newSearch = new URI($window.location.href);
        var searchObject;
        var fd;

        newSearch.removeSearch('cid');
        newSearch.addSearch('cid', node.id);

        if (node.parent.abbr === 'BT') {
          searchObject = newSearch.search(true);
          fd = searchObject.f;
          var searchElement;
          if (!fd || typeof fd === 'string') {
            searchElement = '';
          } else {
            searchElement = fd;
            searchElement.pop();
          }

          newSearch.removeSearch('f');
          newSearch.addSearch('f', searchElement);

        } else if (node.parent.relationType === 'association') {

          searchObject = newSearch.search(true);
          fd = searchObject.f;
          var searchArray = [];

          if (typeof fd === 'string') {
            searchArray = [];
          } else if (typeof fd === 'object') {
            searchArray = fd;
          }

          searchArray
            .push('dc.subject.ss["' + node.id + '"]["' + node.name + '"]');

          searchArray = _.uniq(searchArray);
          newSearch.removeSearch('f');
          newSearch.addSearch('f', searchArray);
        }

        if (node.parent.parent && node.parent.parent.isRoot) {

          newSearch.removeSearch('ch');
          newSearch.addSearch('ch', node.parent.parent.id);
        }

        if (node.parent.relationType === 'hierarchy') {
          newSearch.removeSearch('q');
          newSearch.addSearch('q', node.name);
          newSearch.removeSearch('mq');
          newSearch.addSearch('mq', 'dc.subject.ss:ID' + node.id);
        }

        $window.location.href = newSearch;
      },
      launchFeatureDetection: function() {
        ortConsole.lc('Launching feature detection....');
        var a;
        if (a = $window.document.implementation, a &&
         a.hasFeature(
           'http://www.w3.org/TR/SVG11/feature#Extensibility', '1.1')) {
          this.mode = 'foreignObject';
          ortConsole.lc('supports foreign object >>' + this.mode,
              {color: 'green'});

        } else {
          this.mode = 'textFit';
          ortConsole.lc('DOES NOT SUPPORT FOREIGN OBJECT >>' +
              this.mode, {color: 'red'});

        }
        return this.mode;
      }
    };
  };

