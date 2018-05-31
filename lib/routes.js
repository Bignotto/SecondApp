/*
* The Big Game Collection
*
* Thiago Bignotto
* May, 22nd 2018

* Routes requests to their handlers.
*/

//dependencies
var handlers = require('./handlers');

var route = {
    //route : handler
    'ping' : handlers.ping,
    'user' : handlers.user,
    'token': handlers.token,
    'platform': handlers.platform
};

module.exports = route;