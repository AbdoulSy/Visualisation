Visualizer Component v~1.3
=========================

This Is the Visualizer Component to be installed in Various Smartlogic Applications
In this File, Will be described how to install and use the files in this application


###Directory Structure

    drwxrwxr-x  2 abdouls abdouls 4096 Jan 25 06:32 config/
    drwxrwxr-x  2 abdouls abdouls 4096 Jan 25 06:32 dev/
    drwxrwxr-x  2 abdouls abdouls 4096 Jan 25 06:32 directives/
    -rw-rw-r--  1 abdouls abdouls 2398 Jan 25 06:32 directory-structure.txt
    drwxrwxr-x  2 abdouls abdouls 4096 Jan 25 06:32 errors/
    drwxrwxr-x  2 abdouls abdouls 4096 Jan 25 06:32 externals/
    drwxrwxr-x  2 abdouls abdouls 4096 Jan 25 06:32 functions/
    drwxrwxr-x  2 abdouls abdouls 4096 Jan 25 06:32 _future/
    drwxrwxr-x  3 abdouls abdouls 4096 Jan 25 06:32 graph/
    -rw-rw-r--  1 abdouls abdouls   23 Jan 25 06:32 .jscsrc
    drwxrwxr-x  2 abdouls abdouls 4096 Jan 25 06:32 language/
    drwxrwxr-x  2 abdouls abdouls 4096 Jan 25 06:32 modules/
    drwxrwxr-x  2 abdouls abdouls 4096 Jan 25 06:32 semaphore/
    drwxrwxr-x  2 abdouls abdouls 4096 Jan 25 06:32 ses/
    drwxrwxr-x  2 abdouls abdouls 4096 Jan 25 06:32 templates/
    -rw-rw-r--  1 abdouls abdouls  434 Jan 25 06:32 visualizer-module.js


#####Config
The config Module, in this folder are the default configurations of the Visualizer
These configurations can be overwritten

#####dev
The dev Module, used to provide extra features When the dev mode is set to true on the config file
At the moment for the visualizer a special console and some rulers for the visualizer will be shown

#####directives
All the Angular.js directives that should be used inside the host application to drive the visualizer

#####directory-structure.txt
this file is updated (at the moment) at each new version, it is maintained manually, but could be dynamic

#####errors
This is the Errors module, The error system is pretty small at the moment and only references the most Crucial Elements

#####externals
This is the conversion of external libraries into angular services to be consumed by the visualizer

#####functions
This is the Functions Modules, some utilitary operations that are reused often are stored here

#####_future
This is an experimental module sometimes used for Prototyping, Where new features are being born

#####graph
This is the Graph module, most of the Graphical Operations are inside this folder
#####.jscsrc
Inside this file are defined the coding standards, All the files in this directory Structure are following 
google's javascript code standards, and are validated by jscs
#####language
The Language Module for internationalisation and for extracting verbose statements
#####modules
The Modules Folder, All submodules of Visualizer will be located into this folder
#####semaphore
The Semaphore Folder, where a custom data manager and parser is used in order to manipulate the data from semaphore's backend
#####ses
The SES Folder, where a custom data manager and parse are used in order to manipulate the data coming from SES Endpoints
#####templates
The templates folder, where most of the asynchronous HTML is stored
#####visualizer-module.js
This is the angular module, used as an angular Handle to be injected into a HOST application's adapter to drive the Visualizer
