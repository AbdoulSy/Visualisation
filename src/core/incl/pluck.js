module.exports = function(element, name) {
        var eqList = element[name] || false;
        var returnList = [];
        _.each(eqList, function(eq) {
          var plucked = _.pluck(eq.fields, 'field');
          returnList = returnList.concat(plucked);
        });

        return returnList;
      };

