var config = {
    // connection settings
    nickname:   'eve-dev',
    host:       'irc.underrun.org',
    port:       6697,
    ssl:        true,
    selfSig:    true,
    certExp:    true,
    channels:   ['#underrun'],

    // other stuff
    debug:      true,
}

module.exports.val = config;
