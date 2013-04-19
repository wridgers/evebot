var config = {
    // connection settings
    nickname:   'eve',
    host:       'irc.server.net',
    port:       6697,
    ssl:        true,

    // accept self signed and expired certs
    selfSig:    true,
    certExp:    true,

    // list of chans to join
    channels:   ['#channel', '#anotherchan'],

    // other stuff
    debug:      false,
}

module.exports.val = config;
