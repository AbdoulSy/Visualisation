module.exports = function(data) {
        var root = {};
        var terms = [];
        var i;
        if (data.parameters.service === 'browse') {
          root.name = data.parameters.tbdb;
          root.nodeClass = 'root';
          root.href = false;
          root.children = [];
          terms = data.terms;
          for (i in terms) {
            root.children.push({
              nodeClass: 'rootChildren',
              name: terms[i].term.name,
              href: terms[i].term.id,
              uri: terms[i].term.uri
            });
          }
          return root;
        }
};
