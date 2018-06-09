/*
* The Big Game Collection
*
* Thiago Bignotto
* May, 27th 2018
*
* Platform Service
* A platform is a video game console, an arcade system or a computer operating system. It is where the game runs and provide resources to it.
* Platform data example:
* - id: PS4
* - name: PlayStation 4
* - launch date: 11/15/2013
* - manufacturer: Sony
* - games ['game1','game2',...]
*/

//dependences
var _data = require('./data');
var _helpers = require('./helpers');
var _token = require('./token');

//container
var platform = {};

/*
Post method
Required: id
*/
platform.post = function(data,callback) {
    var dateObject = new Date(data.payload.date);
    var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length > 0 ? data.payload.id.trim() : false;
    var name = typeof(data.payload.name) == 'string' && data.payload.name.trim().length > 0 ? data.payload.name.trim() : false;
    var dateObject = dateObject instanceof Date ? dateObject : false;
    var manufacturer = typeof(data.payload.manufacturer) == 'string' && data.payload.manufacturer.trim().length > 0 ? data.payload.manufacturer.trim() : false;
    //check for valid token
    //check for valid id
    //store data

    var token = typeof(data.headers.token) == 'string'&& data.headers.token.length == 20 ? data.headers.token : false;
    var user = typeof(data.headers.user) == 'string'&& data.headers.user.length > 0 ? data.headers.user : false;
    
    if(token && user) {
        _token.validate(token,user,function(isValid) {
            if(isValid) {
                if(id) { //id is the only required field
                    _data.read('platform',id,function(err,platformData){
                        if(err) {
                            var platformObject = {
                                'id' : id,
                                'name' : name,
                                'date' : _helpers.formatDate(dateObject),
                                'dateObj' : dateObject,
                                'manufacturer' : manufacturer
                            };
            
                            //store object
                            _data.create('platform',id,platformObject,function(err) {
                                if(!err) {
                                    callback(200);
                                } else {
                                    callback(400,{'error':'cant create platform file'});
                                }
                            });//_data.create
                        } else {
                            callback(400,{'error':'platform already exists'});
                        }
                    })//_data.read
                } else {
                    callback(400,{'error':'missing platform id'});
                }//if id
            } else {
                callback(500,{'error':'invalid token'});
            }//if isValid
        });//_token.validate
    } else {
        callback(500,{'error':'no session found'});
    }

};//platform.post

module.exports = platform;