module.exports =  function(data) {
        if (data.parameters.service === 'browse') {
          var terms = data.terms;
          var i;
          var root = {
              children: []
            };

          for (i in terms) {
            root.children.push({
              name: terms[i].term.name,
              href: terms[i].term.id,
              uri: terms[i].term.uri
            });
          }
          return {
            name: data.parameters.tbdb,
            type: 'Ontology Root Name',
            children: root.children
          };
        }
        if (data.parameters.service === 'term') {
          var node = data.terms[0].term;
          return {
            name: node.name,
            type: 'Term',
            className: node['class'],
            href: node.id,
            useFor: this.pluck(node, 'equivalence'),
            children: node.children
          };
        }
      };

