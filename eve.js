#!/usr/bin/env node

// important modules for function
var program     = require('commander'),
    fs          = require('fs'),
    irc         = require('irc');

var version     = 'evebot v0.2.0a-r1-alpha';

// set up program
program
    .version(version)
    .option('-c, --config <config>', 'path to configuration file')
    .option('-d, --debug', 'enable debug mode')
    .parse(process.argv);

// default location
var configFile = './config/config.js';

// override if set in arguments
if ('config' in program)
    configFile = program.config;

// check for config.js
if (!fs.existsSync(configFile)) {
    console.log('config file not found.');
    process.exit(0);
}
    
// load config from config.js
var config = require(configFile).val;

// hooks
var hooks = {
    commandHooks: new Array(),
    messageHooks: new Array(),
    tickHooks:    new Array(),

    addCommandHook: function(prefix, callback) {
        this.commandHooks.push(new Array(
            prefix,
            callback
        ));
    }
}

// add a simple hook 
hooks.addCommandHook('?version', function( from, to, arguments ) {
    client.say(to, version + ' - bitbucket.org/wridgers/evebot');
});

// load the modules
// TODO: skip non .js files
fs.readdir('./modules', function(err, files) {
    for (var i = 0; i < files.length; i++) {
        var module = require('./modules/' + files[i]);
        module.eveModule(client, hooks);
    }
});

// let's go
var client = new irc.Client(config.host, config.nickname, {
    userName:       config.nickname,
    realName:       'evebot',

    debug:          config.debug,
    showErrors:     config.debug,

    autoRejoin:     true,

    port:           config.port,
    channels:       config.channels,
    secure:         config.ssl,
    selfSigned:     config.selfSig,
    certExpired:    config.certExp
});

// add a message listener that checks for commands
client.addListener('message', function( from, to, message ) {
    // get the location of the first space
    var index = message.indexOf(' ');

    // in case there is no argument
    if (index == -1) {
        var prefix  = message;
        var content = '';
    } else { 
        var prefix  = message.substring(0, index);
        var content = message.substring(index + 1);
    }

    // now, check if there is a callback set for prefix.
    hooks.commandHooks.forEach(function(hook) {
        if (hook[0] == prefix) 
            hook[1](from, to, content);
    });
});

// incase we get an exception, don't die
process.on('uncaughtException', function (error) {
    console.log('[error] caught exception: ' + error);
});
