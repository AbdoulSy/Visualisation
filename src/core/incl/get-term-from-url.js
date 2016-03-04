module.exports =  function(variableName, ifTermFound, ifNoTermsFound) {
        var term = this.getQueryVariable(variableName);
        if (term) {
          if (typeof ifTermFound === 'function') {
            ifTermFound(term, true);
          }
        } else {
          if (typeof ifNoTermsFound === 'function') {
            ifNoTermsFound();
          }
        }
      };

