module.exports.eveModule = eveModule;

// eveModule constructor
function eveModule(client, hooks) {

    // save self
    var self    = this;

    // important
    self.client = client;

    // identity
    self.name   = 'say';
    self.desc   = 'says stuff';

    // simple function
    self.say = function (from, to, arguments) {
        if (arguments == '') {
            self.client.say(to, '?say <text>');
        } else {
            self.client.say(to, arguments);
        }
    }

    // add a command hook
    hooks.addCommandHook('?say', self.say);
    hooks.addCommandHook('?s',   self.say);
}
