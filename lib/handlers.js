/*
* The Big Game Collection
*
* Thiago Bignotto
* May, 22nd 2018
*
* Requests handlers
*/

var handlers = {};

handlers._user = require('./user');
handlers._token = require('./token');

handlers.user = function(data,callback) {
    var methodsAllowed = ['post','get','put','delete'];
    if(methodsAllowed.indexOf(data.method) > -1) {
        handlers._user[data.method](data,callback);
    } else {
        callback(405,{'ERROR' : 'Method not allowed for /user'});
    }
};

handlers.token = function(data,callback) {
    var methodsAllowed = ['post','get','put','delete'];
    if(methodsAllowed.indexOf(data.method) > -1) {
        handlers._token[data.method](data,callback);
    } else {
        callback(405,{'ERROR' : 'Method not allowed for /token'});
    }
};

handlers.ping = function(data,callback) {
    callback(200,{'PING':'PONG'});
};

handlers.notFound = function(data,callback) {
    callback(404);
};

module.exports = handlers;