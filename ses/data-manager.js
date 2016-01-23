//#include_in_bubbles.tag
/* global angular, $*/
(function(angular) {
  'use strict';
  angular.module('visualizer.server').service('visualizer.ses.data',
    ortGraphDataService);

  ortGraphDataService.$inject = ['$window', 'visualizer.externals.URI',
   'visualizer.config.settings'];
  function ortGraphDataService($window, URI, ortSettings) {

    return {
      init: function(data, query, callback) {
        this.data = data;
        if (!this.data) {
          this.data = this.getAllRemote(query, callback);
        }
        return this.data;
      },

      getRemoteUrl: function() {
        var q = new URI($window.location.href);
        var searchParams = q.search(true);
        var query;
        var currentConf;
        if (searchParams.mq && searchParams.mq.toString().length > 0 &&
            !searchParams.cid) {
          query = searchParams.mq.replace('dc.subject.ss:ID', '');
          currentConf = ortSettings.data.ses;
          return currentConf.fullUrl + '/' + currentConf.language + '/' +
            currentConf.browseSuffix  + query + '.json';
        } else if (searchParams.cid && searchParams.cid.toString().length > 0) {
          query =  searchParams.cid;
          currentConf = ortSettings.data.ses;
          return currentConf.fullUrl + '/' + currentConf.language + '/' +
            currentConf.browseSuffix  + query + '.json';
        } else if (ortSettings.data.showFacetByDefault === true) {
          query = ortSettings.data.defaultFacetId;
          currentConf = ortSettings.data.ses;
          return currentConf.fullUrl + '/' + currentConf.language + '/' +
            currentConf.browseSuffix  + query + '.json';
        } else {
          currentConf = ortSettings.data.ses;
          return currentConf.fullUrl + '/' + currentConf.language + '/' +
            currentConf.rootSuffix;
        }

      },

      getAllRemote: function(query, callback) {
        return $.ajax(this.getRemoteUrl(query) ,{
           complete: callback,
           crossDomain: true,
           type: 'GET',
           dataType: 'json'
         });
      },

      getAll: function() {
        return {
          name: 'Superheros',
          children: [
            {name: 'Lorem ipsum', children: [
              {name: 'Lorem ipsum dolor', children: []}]},
            {name: 'Lorem ipsum', children: [
              {name: 'Quisque molestie pulvinar libero nec luctu',
                children: []}]},
            {name: 'Lorem ipsum', children: [
              {name: 'Nulla facilisi. Praesent laoreet ante lacus,' +
                'vitae scelerisque massa blandit vel. Etiam hendrerit vitae' +
                'nisi fringilla malesuada', children: [{name: 'Lorem ipsum',
                  children: []}]}]},
            {name: 'Lorem ipsum', children: [
              {name: 'Lorem ipsum dolot amet', children: [
                {name: 'Lorem ipsum', children: []}]}]},
            {name: 'Lorem ipsum', children: [
              {name: 'Lorem ipsum dolor', children: []}]},
            {name: 'Lorem ipsum', children: [
              {name: 'Lorem ipsum dolot amet', children: [
                {name: 'Lorem ipsum', children: []}]}]}
          ]
        };
      }
    };
  }

})(angular);

