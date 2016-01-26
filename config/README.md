Visualizer Module Config Settings
===================================

These are the default Settings used by the Visualizer Component
As you can see there is a lot of configurable options
Just modify the config settings here, just before deploying your application to change the behaviour of the visualizer

#####devMode {Boolean} (false)
Setting this to true will frame the bubbles inside svg ruler, and will have a more verbose console

#####diameter {String|Number} ("dynamic")
The diameter of the visualizer graph, (in pixels) setting it to "dynamic" and the Graph will take the size of its parent container

#####marginLeft, marginRight, marginTop, marginBottom {number} (20)
The margins for the visualizer in pixels

####assets {object}
A way to override the folder where assets are located

#####nbOfCharactersForEachBubble {number} (30)
Used on versions prior to 1.3.0 as a way to tokenize the text on each "bubble"

#####circle {object(radius:Number (50), diameter:Number (50))} 
The options for the visual aspect of a circle


####Graph {Object}
The Options for the Graph

#####Graph:templating
Templating options for the graph

#####Graph:paginator
The Paginator can be tweaked a little bit for now (currently working an adding more flexibility)


####textFit {object}
The Options for textFitting on bubbles

#####textFit:activated {boolean}
Do we activate textFit ?

#####textFit: activatedOnMode {String}
If Activated on which bubble mode

#####textFit:settings {object}
The textFit Settings

####data
used for versions prior to 1.3.0 and for the Visualizers using the SES endpoint
