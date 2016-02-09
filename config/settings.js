/* @global angular */
(function(angular) {
  'use strict';
  /** @namespace visualizer.config */
  angular.module('visualizer.config').value('visualizer.config.settings',
    /** @var {object} visualizer.config:settings */
    {
    devMode: false,
    //diameter: 590,
    diameter: 'dynamic',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    assets: {
      svg: {
        directory: 'public/assets/svg'
      }
    },
    marginBottom: 20,
    nbOfCharactersForEachBubble: 30,
    circle: {
      radius: 50,
      diameter: 100
    },
    graph: {
      templating: {
        width: 'dynamic',
        height: 'dynamic'
        //width: 590,
        //height: 590
      },
      paginator: {
        circleRadius: 50,
        maxNbOfChildLeaves: 12,
        minNbOfChildLeaves: 3,
        mode: 'progressive'
      }
    },
    textFit: {
      activated: true,
      activatedOnMode: 'textFit',
      settings: {
        alignHoriz: true,
        multiLine: true,
        maxFontSize: 14,
        minFontSize: 8
      }
    },
    data: {
      showFacetByDefault: true,
      defaultFacetId: 'OMII0II2114591377',
      mode: 'semaphore',
      ses: {
       protocol: 'http',
       port: '80',
       serverName: 'stiletto.smartlogic.com',
       path: 'nasapoc/',
       rootSuffix: 'hierarchy/roots.json',
       language: 'english',
       browseSuffix: 'terms/',
       ontologyName: 'nasapoc',
       fullUrl: 'http://stiletto.smartlogic.com/ses/nasapoc'
     }
    }
  });

})(angular);

