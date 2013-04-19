module.exports.eveModule = eveModule;

// load wunderbar
var wunderbar = require('wunderbar');
var weather   = new wunderbar('d332b63613bf35fe');

// eveModule constructor
function eveModule(client, hooks) {

    // save self
    var self    = this;

    // important
    self.client = client;

    // identity
    self.name   = 'wunder';
    self.desc   = 'wunderground stuff';

    // simple function
    self.weather = function (from, to, arguments) {
        weather.conditions(search, function(err, res) {
            if (res === undefined || err == true || res == '' || 'error' in res.response) {
                client.say(to, 'Sorry, no results or an error occured.');
            } else {
                var current     = res.current_observation;

                var where       = current.display_location.full;
                var updated     = current.observation_time;

                var weather     = current.weather;
                var temp        = current.temperature_string;
                var humidity    = current.relative_humidity;

                var wind        = current.wind_string;
                var winddir     = current.wind_dir;
                var windspeed   = current.wind_kph;

                var windchill   = current.windchill_string;
                var feelslike   = current.feelslike_string;

                var visibility  = current.visibility_km;

                client.say(to, 'Location: '+where+', '+updated);
                client.say(to, 'Weather: '+weather+' -=- Temp: '+temp+', feels like '+feelslike+' -=- Humidity: '+humidity);
                client.say(to, 'Wind: '+wind+'('+winddir+') at '+windspeed+'KPH -=- Wind chill: '+windchill); 
            }
        });
    }

    // add a command hook
    hooks.addCommandHook('?weather', self.weather);
    hooks.addCommandHook('?w',       self.weather);
}

eveModule.prototype.message = function( from, to, search, client ) {
}
