module.exports.eveModule = eveModule;

var tomatoes = require('tomatoes');
var movies   = tomatoes('4s47vctrajatat6625c6vt63');

// eveModule constructor
function eveModule(client, hooks) {

    // save self
    var self    = this;

    // important
    self.client = client;

    // identity
    self.name   = 'rotten';
    self.desc   = 'rotten tomatoes interface';

    // simple function
    self.movie = function (from, to, arguments) {
        var search = arguments.toLocaleLowerCase();

        movies.search(search, function(err, res) {
            var count = res.length;

            if (count > 0) {
                if (count > 5)
                    count = 5;

                // perfect match?
                if (search == res[0].title.toLocaleLowerCase())
                    count = 1;

                for (var i = 0; i < count; i++) {
                    var movie       = res[i];

                    var title       = movie.title;
                    var year        = movie.year;
                    var mpaa        = movie.mpaa_rating;
                    var runtime     = movie.runtime;

                    var rating      = movie.ratings.critics_rating;
                    var score       = movie.ratings.critics_score;

                    if (score < 0) {
                        rating      = movie.ratings.audience_rating;
                        score       = movie.ratings.audience_score;
                    }

                    if (rating === undefined)
                        rating = 'Unknown';

                    client.say(to, title + ' [' + year + '][' + mpaa + '][' + runtime + 'm][' + rating + '][' + score +']' );
                }
            } else {
                client.say(to, 'No movies found!');
            }
        });
    }

    // add a command hook
    hooks.addCommandHook('?m',     self.movie);
    hooks.addCommandHook('?movie', self.movie);
}
