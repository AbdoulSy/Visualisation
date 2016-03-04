module.exports = function(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');
        var i = 0;
        var pair;
        var len = vars.length;
        for (i = 0; i < len; i++) {
          pair = vars[i].split('=');
          if (decodeURIComponent(pair[0]) === variable) {
            return decodeURIComponent(pair[1]);
          }
        }
        return false;
      };

