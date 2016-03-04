module.exports = function(base, ns, parseKey) {
        //declarations
        var nsParts;
        var i;
        var partsLen;
        //assignments
        parseKey = parseKey || ':';
        nsParts = ns.split(parseKey);
        partsLen = nsParts.length;
        //loop_operation
        for (i = 0; i < partsLen; i = i + 1) {
          if (typeof base[nsParts[i]] === 'undefined') {
            base[nsParts[i]] = {};
          }
          base = base[nsParts[i]];
        }

      };

