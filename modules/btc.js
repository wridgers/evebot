module.exports.eveModule = eveModule;

var request = require('superagent');
var crypto  = require('crypto');

// btc-e
var key = 'HIAE1R3C-DTXCA1C2-DL8YYO36-J3VI4MWS-PC77FEI2';
var sec = 'b5d411d9c2a489dd1a017b79754db5d6201f624679a1676fb79c512d53d72436';

var BTCE = require('btc-e'),
    btce = new BTCE(key, sec);

// eveModule constructor
function eveModule(client, hooks) {

    // save self
    var self    = this;

    // important
    self.client = client;

    // identity
    self.name   = 'btc';
    self.desc   = 'bitcoin module';

    // simple function
    self.btc = function (from, to, arguments) {
        var arg = arguments.toLocaleUpperCase();

        if (arg != 'USD' && arg != 'EUR' && arg != 'GBP') {
            client.say(to, '?btc <usd|eur|gbp>');
            return;
        }

        // Mt. Gox
        request
        .get('https://mtgox.com/api/1/BTC'+arg+'/ticker')
        .set('User-Agent', 'eve irc bot')
        .end(function(res) {
            if (res.body.result == 'success') {
                var data = res.body.return;

                var high    = data.high.display;
                var low     = data.low.display;
                var avg     = data.avg.display;

                var volume  = data.vol.display;

                var bid     = data.buy.display;
                var ask     = data.sell.display;

                client.say(to, '[mtgox] Bid: '+bid+', Ask: '+ask+', Volume: '+volume+', High: '+high+', Low: '+low+', Avg: '+avg);
            } else {
                client.say(to, '[mtgox] An error occured! Maybe Mt. Gox is down?');
            }
        });

        // bitfloor - USD only
        try {
            if (arg == 'USD') {
                request
                .get('https://api.bitfloor.com/book/L1/1')
                .set('User-Agent', 'eve irc bot')
                .end(function(res) {
                    console.log(res);
                    if (res.ok) {
                        var data = res.body;

                        var bid = data.bid[0];
                        var ask = data.ask[0];

                        client.say(to, '[btflr] Bid: $'+bid+', Ask: $'+ask);
                    } else {
                        client.say(to, '[btflr] An error occured! Maybe BitFloor is down?');
                    }
                });
            }
        } catch (er) {
            client.say(to, '[btflr] An error occured! Maybe BitFloor is still fucked?');
        }

        // btc-e
        if (arg == 'USD' || arg == 'EUR') {
            var arglow = arg.toLocaleLowerCase();
            btce.ticker('btc_'+arglow, function(err, data) {
                if (err) {
                    client.say(to, '[btc-e] An error occured! Maybe BTC-E is down?');
                } else {
                    var data = data.ticker;

                    var bid = data.buy;
                    var ask = data.sell;

                    var volume  = data.vol;
                    var high    = data.high;
                    var low     = data.low;
                    var avg     = data.avg;

                    if (arg == 'USD')
                        client.say(to, '[btc-e] Bid: $'+bid+', Ask: $'+ask+', Volume: '+volume+', High: $'+high+', Low: $'+low+', Avg: $'+avg);

                    if (arg == 'EUR')
                        client.say(to, '[btc-e] Bid: €'+bid+', Ask: €'+ask+', Volume: '+volume+', High: €'+high+', Low: €'+low+', Avg: €'+avg);
                }

                console.log(data);
            });
        }
    }

    // add a command hook
    hooks.addCommandHook('?btc', self.btc);
}
