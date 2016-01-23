//#include_in_bubbles.tag
/* global angular */
(function(angular) {
  'use strict';
  angular.module('visualizer.server').service('visualizer.ses.processor',
    lsDataProcessor);

  lsDataProcessor.$inject = ['visualizer.externals.d3'];
  //todo implement when the backend is implemented
  function lsDataProcessor(d3) {

    return {
      processData: function(data) {
        var o = {};
        o = data;
        o.children = [];
        var color = d3.scale.category20c();

        for (var b in data.associated) {
          var bb = data.associated[b];
          bb.children = [];
          bb.isRelation = true;
          bb.relationType = 'association';
          bb.relationColor = color(b);
          for (var bbb in bb.fields) {
            bb.children.push(bb.fields[bbb].field);
          }
          o.children.push(bb);
        }
        for (var a in data.hierarchy) {
          var aa = data.hierarchy[a];
          aa.children = [];
          aa.relationColor = color(a);
          aa.isRelation = true;
          aa.relationType = 'hierarchy';
          for (var aaa in aa.fields) {
            aa.children.push(aa.fields[aaa].field);
          }
          o.children.push(aa);
        }
        return o;
      }

    };
  }

})(angular);

