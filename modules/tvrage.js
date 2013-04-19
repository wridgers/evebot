module.exports.eveModule = eveModule;

var tvrage = require('nodejs-tvrage'); 
var tv     = new tvrage(); 

// eveModule constructor
function eveModule(client, hooks) {

    // save self
    var self    = this;

    // important
    self.client = client;

    // identity
    self.name   = 'tvrage';
    self.desc   = 'tvrage stuff';

    // simple function
    self.tv = function (from, to, arguments) {
        var search = data.toLocaleLowerCase();

        tv.search(search, function(res) {
            var count = res.length;

            if (count > 0) {
                if (count > 5)
                    count = 5;

                var detail = false;

                // perfect match?
                if (search == res[0].name.toLocaleLowerCase()) {
                    count   = 1;
                    detail  = true;
                }

                for (var i = 0; i < count; i++) {
                    var show = res[i];

                    var id          = parseInt(show.showid);
                    var name        = show.name;
                    var country     = show.country;

                    var started     = show.started;
                    var ended       = show.ended;

                    if (ended == 0)
                        ended = '~';

                    var seasons     = show.seasons;
                    var status      = show.status;

                    client.say(to, name + ' [' + country + '][' + started + ' - ' + ended + '][Seasons: ' + seasons + '][' + status +']' );

                    tv.showInfo(id, function(res) {
                        var runtime     = res.runtime;
                        var airtime     = res.airtime;
                        var airday      = res.airday;
                        var timezone    = res.timezone;

                        if (ended == '~') 
                            client.say(to, 'Next episode airs on ' + airday + ' at ' + airtime + ' (' + timezone + ')');
                    });
                }
            } else {
                client.say(to, 'No TV shows found!');
            }
        });
    }

    // add a command hook
    hooks.addCommandHook('?tv',  self.tv);
    hooks.addCommandHook('?t',   self.tv);
}
