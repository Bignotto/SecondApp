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

    var platformObject = {
        'id' : id,
        'name' : name,
        'date' : dateObject,
        'manufacturer' : manufacturer
    };

    console.log(JSON.stringify(platformObject));
    callback(200);
};//platform.post

module.exports = platform;