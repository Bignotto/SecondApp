/*
* The Big Game Catalog
*
* Thiago Bignotto
* May, 21st 2018
*
* Entry point for the App
*/

//TODO: finish the README.md file

//dependencies
var http = require('http');
var https = require('https');
var fs = require('fs');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var _config = require('./lib/config');
var _data = require('./lib/data');
var _route = require('./lib/routes');
var _handler = require('./lib/handlers');
var _helpers = require('./lib/helpers');

//log the configuration
console.log(JSON.stringify(_config));

/*
* Creating the servers. This servers will start listen on port defined in the config.js file
* based on wich environment the app is running.
*/
var httpsServerOptions = {
    'key' : fs.readFileSync('./https/key.pem'),
    'cert' : fs.readFileSync('./https/cert.pem')
};
var httpsServer = https.createServer(httpsServerOptions,function(req,res){
    startServer(req,res);
});
httpsServer.listen(_config.httpsPort,function(){
    console.log('Starting HTTPS Server on port: ' + _config.httpsPort + ' .......OK');
});

var httpServer = http.createServer(function(req,res){
    startServer(req,res);
});
httpServer.listen(_config.httpPort,function(){
    console.log('Starting HTTP Server on port: ' + _config.httpPort + ' ........OK');
});


/*
* This function will be called from both HTTP and HTTPS server when they start listen
* for requests.
*/
var startServer = function(req,res) {
    //get all things we need to know
    var parsedUrl = url.parse(req.url,true);
    var path = parsedUrl.pathname.replace(/^\/+|\/+$/g,'');
    var queryStringObject = parsedUrl.query;
    var method = req.method.toLowerCase();
    var headers = req.headers;
    
    //getting the payload from request. 
    //the data user sent on the request.
    //the data will come as a stream, so it have to write the chunks of data into a buffer and then use it
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data',function(stream) {
        //writing data chunks to buffer
        buffer += decoder.write(stream);
    })
    req.on('end',function(){
        //closeing buffer so now it became useful
        buffer += decoder.end();

        //console.log(buffer);
        //create an object for the handlers use
        var data = {
            //'url':parsedUrl,
            'path':path,
            'query':queryStringObject,
            'method':method,
            'headers':headers,
            'payload':_helpers.parseJSonToObj(buffer)
        }
    
        //send the request to handler defined in routes
        var theHandler = typeof(_route[path]) !== 'undefined' ? _route[path] : _handler.notFound;
        //call the handler
        theHandler(data,function(statusCode,payload) {
            //use status code returned from the handler or set it to 200 (OK) if none
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
            //use the payload returned or set it to an empty object
            payload = typeof(payload) == 'object' ? payload : {};
            //stringfy the payload
            var payloadString = JSON.stringify(payload);
    
            //return the response
            res.setHeader('Content-Type','application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
            //console.log(JSON.stringify(data));
        });//theHandler
    })//req.on end

};//startServer
