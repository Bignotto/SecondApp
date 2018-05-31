/*
* The Big Game Collection
*
* Thiago Bignotto
* May, 28th 2018
*
* Token Service
*/

//dependences
var _data = require('./data');
var _helpers = require('./helpers');

//container
var token = {};

/*
Post method
Required: username, password

Only create a token if the user provides the correct password.
*/
token.post = function(data,callback) {
    var userName = typeof(data.payload.userName) == 'string' && data.payload.userName.trim().length > 0 ? data.payload.userName.trim() : false;
    var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

    //check required fields
    if(userName && password) {
        _data.read('user',userName,function(err,userData) {
            if(!err && userData) {
                //check if the password is correct
                var hashedPass = _helpers.hash(password);
                if(hashedPass == userData.passwordHash) {
                    var tokenId = _helpers.createRandomString(20);
                    var expires = Date.now() + 1000 * 60 * 60;
                    var tokenObject = {
                        'user' : userName,
                        'id' : tokenId,
                        'expires' : expires
                    };
                    //store the token
                    _data.create('token',tokenId,tokenObject,function(err) {
                        if(!err) {
                            callback(200,tokenObject);
                        } else {
                            callback(400,{'ERROR':'token not created'});
                        }
                    });//_data.create
                } else {
                    callback(400,{'ERROR':'na na na, no donuts for you'});
                }
            } else {
                callback(400,{'ERROR':'cant find user'});
            }
        })//_data.read
    } else {
        callback(400,{'ERROR':'Missing required fields!'});
    }
}//token.post

/*
Get method
Required: id

Just get the token by the id, if there is a token the user has been authenticated, the password is checked
in the post function.
*/
token.get = function(data,callback) {
    var id = typeof(data.query.id) == 'string' && data.query.id.trim().length > 0 ? data.query.id : false;
    if(id) {
        _data.read('token',id,function(err,tokenData) {
            if(!err && tokenData) {
                callback(200,tokenData);
            } else {
                callback(404);
            }
        });//_data.read
    } else {
        callback(400,{'error' : 'missing user name'});
    }
};//token.get

/*
Put method
Required: username, token id
*/
token.put = function(data,callback) {
    var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
    var extend = typeof(data.payload.extend) == 'boolean'&& data.payload.extend == true ? true : false;
    if(id && extend) {
        _data.read('token',id,function(err,tokenData) {
            if(!err && tokenData) {
                if(tokenData.expires > Date.now()) {
                    tokenData.expires = Date.now() + 1000 * 60 * 60;
                    _data.update('token',id,tokenData,function(err) {
                        if(!err) {
                            callback(200);
                        } else {
                            callback(400,{'error':'could not extend session'});
                        }
                    })
                } else {
                    callback(400,{'error':'token expired'});
                }
            } else {
                callback(400,{'error':'token invalid'});
            }
        });//_data.read
    } else {
        callback(400,{'error':'missing required fields'});
    }
};//token.put

/*
Delete method
Required: id
*/
token.delete = function(data,callback) {
    var id = typeof(data.query.id) == 'string' && data.query.id.trim().length > 0 ? data.query.id : false;
    if(id) {
        _data.read('token',id,function(err,tokenData) {
            if(!err && tokenData) {
                _data.delete('token',id,function(err) {
                    if(!err) {
                        callback(200);
                    } else {
                        callback(400,{'error':'token undeletable hahaha'});
                    }
                });//_data.delete
            } else {
                callback(400,{'error':'invalid token'});
            }
        });//_data.read
    } else {
        callback(400,{'error':'missing required fields'});
    }
};//token.delete

/*
Verify if token is valid
Required: id
*/
token.validate = function(idString,userName,callback) {
    //try to find token
    _data.read('token',idString,function(err,tokenData) {
        if(!err && tokenData) {
            if(tokenData.user == userName && tokenData.expires > Date.now()) {
                callback(true);
            } else {
                callback(false);
            }
        } else {
            callback(false);
        }
    });//_data.read
};//token.validate
//export the module
module.exports = token;