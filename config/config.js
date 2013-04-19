var config = {
    // connection settings
    nickname:   'eve',
    host:       'irc.underrun.org',
    port:       6697,
    ssl:        true,
    selfSig:    true,
    certExp:    true,
    channels:   ['#underrun', '#mathematics'],

    // other stuff
    debug:      false,
}

module.exports.val = config;
