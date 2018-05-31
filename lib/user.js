/*
* The Big Game Collection
*
* Thiago Bignotto
* May, 27th 2018
*
* User Service
*/

//dependences
var _data = require('./data');
var _helpers = require('./helpers');
var _token = require('./token');

//container
var user = {};

/*
Post method.
Required: userName, email, password
Optional: fullName
*/
user.post = function(data,callback) {
    var userName = typeof(data.payload.userName) == 'string' && data.payload.userName.trim().length > 0 ? data.payload.userName.trim() : false;
    var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 0 ? data.payload.email.trim() : false;
    var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    var fullName = typeof(data.payload.fullName) == 'string' && data.payload.fullName.trim().length > 0 ? data.payload.fullName.trim() : false;

    //check for required fileds
    if(userName && email && password) {
        //check if the user exists
        _data.read('users',userName,function(err,data) {
            if(err) {
                //an error here means that there is no file for this user, so it can be created

                var hashedPass = _helpers.hash(password);
                if(hashedPass) {
                    //create the user object
                    var userObject = {
                        'userName' : userName,
                        'email' : email,
                        'passwordHash' : hashedPass,
                        'fullName' : fullName
                    };

                    //store the object
                    _data.create('user',userName,userObject,function(err) {
                        if(!err) {
                            callback(200);
                        } else {
                            //@TODO: why this error hapens when the user already exists??
                            callback(500,{'ERROR':'Cant create user.'});
                        }
                    });//_data.create
                } else {
                    callback(500, {'ERROR':'Cant hash'});
                }
            } else {
                callback(400,{'ERROR':'User already exists'});
            }
        });//_data.read
    } else {
        callback(400,{'ERROR':'Missing required fields!'});
    }
};//user.post

/*
Get method
Required: username
*/
user.get = function(data,callback) {
    var userName = typeof(data.query.userName) == 'string' && data.query.userName.trim().length > 0 ? data.query.userName : false;
    var token = typeof(data.headers.token) == 'string'&& data.headers.token.length == 20 ? data.headers.token : false;
    
    if(userName) {
        if(token) {
            _token.validate(token,userName,function(isValid) {
                if(isValid) {
                    _data.read('user',userName,function(err,userData) {
                        if(!err && userData) {
                          callback(200,userData);
                        } else {
                          callback(404);
                        }
                      });//_data.read
                } else {
                    callback(400,{'error':'invalid token'});
                }
            });//_token validate
        } else {
            callback(400,{'error' : 'no valid tokens for you...'});
        }
    } else {
      callback(400,{'error' : 'missing user name'});
    }
};//user.get

/*
Put method
Required: username
Optional: email, full name, password
*/
user.put = function(data,callback) {
    var userName = typeof(data.query.userName) == 'string' && data.query.userName.trim().length > 0 ? data.query.userName.trim() : false;
    var email = typeof(data.query.email) == 'string' && data.query.email.trim().length > 0 ? data.query.email.trim() : false;
    var password = typeof(data.query.password) == 'string' && data.query.password.trim().length > 0 ? data.query.password.trim() : false;
    var fullName = typeof(data.query.fullName) == 'string' && data.query.fullName.trim().length > 0 ? data.query.fullName.trim() : false;

    var token = typeof(data.headers.token) == 'string'&& data.headers.token.length == 20 ? data.headers.token : false;

    if(userName) {
        if(token) {
            _token.validate(token,userName,function(isValid) {
                if(isValid) {
                    if(email || password || fullName) {
                        _data.read('user',userName,function(err,userData) {
                            if(!err && userData) {
                                if(email) {
                                    userData.email = email;
                                }
                                if(password) {
                                    userData.password = _helpers.hash(password);
                                }
                                if(fullName) {
                                    userData.fullName = fullName;
                                }
                                _data.update('user',userName,userData,function(err){
                                    if(!err) {
                                        callback(200);
                                    } else {
                                        callback(500,{'error':'cant update'});
                                    }
                                });//_data.update
                            } else {
                                callback(400,{'error':'user not exist'});
                            }
                        });//_data.read
                    } else {
                        callback(400, {'error':'nothing to update'});
                    }
                } else {
                    callback(400,{'error':'invalid token'});
                }
            });//_token.validate
        } else {
            callback(400,{'error' : 'no valid tokens for you...'});
        }
    } else {
        callback(400,{'error' : 'missing user name'});
    }
};//user.put

/*
Delete method
Required: username
*/
user.delete = function(data,callback) {
    var userName = typeof(data.query.userName) == 'string' && data.query.userName.trim().length > 0 ? data.query.userName.trim() : false;
    var token = typeof(data.headers.token) == 'string'&& data.headers.token.length == 20 ? data.headers.token : false;

    if(userName) {
        if(token) {
            _token.validate(token,userName,function(isValid) {
                if(isValid) {
                    _data.read('user',userName,function(err,userData){
                        if(!err && userData) {
                            _data.delete('user',userName,function(err){
                                if(!err) {
                                    _data.delete('token',token,function(err){
                                        if(!err) {
                                            callback(200);
                                        } else {
                                            callback(500,{'error' : 'cant delete user token'});
                                        }
                                    });//_data.delete
                                } else {
                                  callback(500,{'error' : 'cant delete user'});
                                }
                            });//_data.delete
                        } else {
                            callback(400,{'error':'user not exist'});
                        }
                    })//_data.read
                } else {
                    callback(400,{'error':'invalid token'});
                }
            });//_token.validate
        } else {
            callback(400,{'error' : 'no valid tokens for you...'});
        }
    } else {
        callback(400,{'error' : 'missing user name'});
    }
};//user.delete
//export the module
module.exports = user;