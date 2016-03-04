module.exports =  function(variableName, ifTermFound, ifNoTermsFound) {
        var term = this.getTermFromHash(variableName);
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


