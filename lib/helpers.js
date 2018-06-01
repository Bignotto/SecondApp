/*
* The Big Game Collection
*
* Thiago Bignotto
* May, 22nd 2018
*
* Some useful functions
*/

//dependences
var crypto = require('crypto');
var _config = require('./config');

var helpers = {};

//create a sha256 hash
helpers.hash = function(str) {
    if(typeof(str) == 'string' && str.length > 0) {
      var hash = crypto.createHmac('sha256',_config.hashSecret).update(str).digest('hex');
      return hash;
    } else {
      return false;
    }
  };


//stringfy to object
helpers.parseJSonToObj = function(str) {
    try {
        var obj = JSON.parse(str);
        return obj;
    } catch(e) {
        return {};
    }
};

//create a random string to identify the session id
helpers.createRandomString = function(lenght) {
    lenght = typeof(lenght) == 'number' && lenght > 0 ? lenght : false;
    if(lenght) {
      var caracteres = 'abcdefghijklmnopqrstuvwxyz0123456789';
      var randomStr = '';
      for(i = 1; i <= lenght; i++) {
        randomStr += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
      }
      return randomStr;
    } else {
      return false;
    }
  };

  helpers.formatDate = function(theDate) {
    var theDate = theDate instanceof Date ? theDate : false;
    if(theDate) {
      var dia = theDate.getDate();
      if (dia.toString().length == 1)
        dia = "0"+dia;
      var mes = theDate.getMonth() + 1;
      if (mes.toString().length == 1)
        mes = "0"+mes;
      var ano = theDate.getFullYear();  
      return dia+"/"+mes+"/"+ano;
    } else {
      return false;
    }
  };

module.exports = helpers;