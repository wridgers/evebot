# evebot
A modular IRC bot written with node.js.

## Install
Create a *config/config.js* file by copying *doc/config.example.js*. Then,

    $ npm install
    $ node eve.js

and job done.

## Modules
Modules are loaded from the ./modules directory. There is a sample module in
*modules/simple.js* detailing all the possible hooks, etc. To get started,
simply copy this file and adjust it to your needs.

## Advanced usage
    $ node eve.js --help
