/* global angular, textFit */
(function() {
  'use strict';
  angular.module('visualizer.graph').service('visualizer.graph.text',
   graphTextService);

  graphTextService.$inject = ['visualizer.graph.utils',
  'visualizer.config.settings'];
  //todo implement when the backend is implemented
  function graphTextService(graphUtils, ortGraphSettings, textFit) {

    return {

      //creates a simple text node
      createText: function(node) {
        return node.append('text')
          .attr('dy', '.31em')
          .style('pointer-events', 'none')
          .attr('ort-text', '')
          .attr('width', (ortGraphSettings.circle.diameter))
          .attr('height', (ortGraphSettings.circle.diameter))
          .attr('text-anchor', graphUtils.getTextAnchorFn())
          .attr('transform', graphUtils.getTextPlacementFn())
          .text(function(d) { return d.name; });
      },

      //creates text as SVG text fitting
      createFittingText: function(node) {
          function calculateTextShape (txt) {
            if (txt.length === 0) {
              return {
                wordCount: 0,
                totalChars: 0,
                charCount: 0,
                charCountNoSpace: 0
              };
            }
            return getTextShape(txt);
          }

          function getTextShape (txt) {
            var rgx = /\s+/gi;
            var trimmed = txt.trim();
            return {
              wordCount: trimmed.replace(rgx, '').split(' ').length,
              totalChars: txt.length,
              charCount: trimmed.length,
              charCountNoSpace: trimmed.replace(rgx, '').length
            };

          }

         function getTextGuide (textShape) {
           if (textShape.wordCount < 3 && textShape.charCountNoSpace < 10) {
             return '#textGuide-oneLn';
           }
           if (textShape.wordCount < 3 && textShape.charCountNoSpace > 10 && textShape.charCountNoSpace < 14) {
             return '#textGuide-oneBigLn';
           }
           if (textShape.wordCount < 4 && textShape.charCountNoSpace < 
             ortGraphSettings.nbOfCharactersForEachBubble) {
             return '#textGuide-twoLn';
           }
           return '#textGuide';
         }

        var elemContainer = node.append('text')
          .attr('width', (ortGraphSettings.circle.diameter))
          .attr('transform', graphUtils.getTextPlacementFn2())
          .attr('height', (ortGraphSettings.circle.diameter))
          .append('textPath')
            .attr('xlink:href', function(d) {
              var textShape = calculateTextShape(d.name);
              d.textShape = textShape;
              return getTextGuide(textShape);
            })
            .text(function(d) {
              var returnedText = d.name
                .substring(0, ortGraphSettings.nbOfCharactersForEachBubble);
              if (d.name.length >
                ortGraphSettings.nbOfCharactersForEachBubble) {
                return returnedText + '...' ;
              } else {
                return returnedText;
              }
            });
        elemContainer.attr('ort-text', '');
        return elemContainer;
      },

      //create text as XHTML text fitting
      //takes an SVG node
      createXHTMLTextElement: function(node) {

        var elem = node.append('foreignObject')
          .attr('transform', graphUtils.getTextPlacementFn())
          .attr('class', 'textNode')
          .attr('width', (ortGraphSettings.circle.diameter))
          .attr('height', (ortGraphSettings.circle.diameter))
          .attr('x','-20')
          .attr('y','-30')
          .append('xhtml:div').classed('node-asset', true)
          .append('xhtml:p')
          .style('width', (ortGraphSettings.circle.diameter))
          .style('height', (ortGraphSettings.circle.diameter))
          .text(function(d) {
            var returnedText = d.name
              .substring(0, ortGraphSettings.nbOfCharactersForEachBubble);
            if (d.name.length > ortGraphSettings.nbOfCharactersForEachBubble) {
              return returnedText + '...' ;
            } else {
              return returnedText;
            }
          })
          .attr('class','ort-text node-asset-rel')
          .attr('text-anchor', graphUtils.getTextAnchorFn())
          .attr('font-size', '1px')
          .style('opacity', function(d) {
            return d.isSlanted ? 0 : 1;
          })
          .transition()
          .duration(400)
          .style('opacity', 1)
          .call(function textFitting() {
            var _this = this || {};
            if (ortGraphSettings.textFit.activated &&
               ortGraphSettings.textFit.activatedOnMode === 'foreignObject') {
              textFit(_this[0][0], ortGraphSettings.textFit.settings);
            }
          });

        return elem;

      },

      //strategy creation of node
      createNodeContents: function(strategy, node) {
        switch (strategy) {
          case 'foreignObject' :
            this.createXHTMLTextElement(node);
            break;
          case 'textFit' :
            this.createFittingText(node);
            break;
          default:
            this.createText(node);
        }
      }
    };
  }
})();
