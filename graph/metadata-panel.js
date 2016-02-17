module.exports = function metadataPanel() {
    return {
       fill: function(data) {
         var viewData = [];
         var className = data['class'];
         if (!className) {
           className = 'Unknown';
         }
         if (className === 'Theme') {
           viewData = [{header: 'Theme', value: data['name']},
                      {header: 'Description', value: data['Description']}];
         } else if (className === 'Product') {
           viewData = [
            {header: 'Product', value: data['name']},
            {header: 'Type',value: data.metadata['Product Type']},
            {header: 'Status', value: data.metadata['Product Status']},
            {header: 'Description', value: data.metadata['Description']},
            {header: 'Image', value: data.metadata['image_url'],
              isImageUrl: true},
            {header: 'Dose Forms', value: data.metadata['Dose Forms']}];
         } else if (className === 'Study') {
           viewData = [
             {header: 'Study', value: data['name']},
             {header: 'Description', value: data.metadata['Description']},
             {header: 'Type', value: data.metadata['Study Type']},
             {header: 'Phase', value: data.metadata['Study Phase']},
             {header: 'Interventional', value: data.metadata['Interventional']},
             {header: 'Sponsor Type', value: data.metadata['Sponsor Type']},
             {header: 'Leader Loc.', value: data.metadata['Leader Location']},
             {header: 'Purpose', value: data.metadata['Study Purpose']},
             {header: 'Exec. Party', value: data.metadata['Study Acc Party']}];
         } else if (className === 'Indication') {
           viewData = [
           {header: 'Indication', value: data['name']},
           {header: 'Image', value: data.metadata['image_url'],
             isImageUrl: true},
           {header: 'Type', value: data.metadata['Indication Type']},
           {header: 'Synonyms', value: data.metadata['Indication Synonyms']}];
         } else if (className === 'Disease Area') {
           viewData = [
           {header: 'Disease Area', value: data.metadata['name']},
           {header: 'Synonyms', value: data.metadata['Disease Synonyms']}];
         } else if (className === 'Missions') {
           viewData = [
           {header: 'Mission', value: data['name']},
           {header: 'Picture', value: data.metadata['image_URL'],
             isImageUrl: true}];
         } else {
           viewData = [
           {header: 'Class', value: data['class']},
           {header: 'Description', value: data.metadata['Description']}];
         }

         var tbody = d3.select('#metadataPanel');
         tbody.selectAll('*').remove();
         var tr = tbody.selectAll('tr').data(viewData)
             .enter()
             .append('tr');
         tr.append('th').attr('width', '120')
            .text(function(d) {
              return d.header;
            });
         var td = tr.append('td');
         td.html(
          function(d) {
            if (d.isImageUrl) {
              return '<img src="' + d.value + '"/>';
            } else {
              return d.value;
            }
          });
       }
     };
  };
