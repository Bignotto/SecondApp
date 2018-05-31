/*
* The Big Game Catalog
*
* Thiago Bignotto
* May, 24th 2018
*
* CRUD for the App
*/

//dependencies
var fs = require('fs');
var path = require('path');
var helpers = require('./helpers');

//container
var data = {};

//get the base directory the app is running on
data.baseDir = path.join(__dirname,'/../data/');

/*
Create a file.
Creates a new file with the content from _data argument passed. The app will attempt to create
a new file, if the file already exists it will return an error, so the app knows that that object
already is stored.
*/
data.create = function(dir,file,_data,callback) {
    //open file
    fs.open(data.baseDir+dir+'/'+file+'.json','wx',function(err,fileDescriptor){
        if(!err && fileDescriptor) {
            //convert data to string
            var stringData = JSON.stringify(_data);
            //write to file and close it
            fs.writeFile(fileDescriptor, stringData, function(err){
                if(!err) {
                    fs.close(fileDescriptor,function(err){
                        if(!err) {
                            callback(false);
                        } else {
                            callback('data.js 34 Error closeing file');
                        }
                    });
                } else {
                    callback('data.js 38 Error writing to file');
                }
            });
        } else {
            callback('data.js 42 Could not create file, it may already exists');
        }
    });
};//data.create

/*
Read the file.
Reads the entire file an return the content.
*/
data.read = function(dir,file,callback) {
    fs.readFile(data.baseDir+dir+'/'+file+'.json','utf8', function(err,fileData){
        if(!err && fileData) {
            var parsedData = helpers.parseJSonToObj(fileData);
            callback(false,parsedData);
        } else {
            callback(err,fileData);
        }
    });
};//data.read

/*
Update file content.
Opens the file and write new data to it. The objcet will be writen entirely, so the logic to update
the object must be in the caller function.
*/
data.update = function(dir,file,_data,callback) {
    //open file for writing
    fs.open(data.baseDir+dir+'/'+file+'.json','r+',function(err,fileDescriptor){
        if(!err && fileDescriptor) {
            var stringData = JSON.stringify(_data);
            fs.truncate(fileDescriptor, function(err) {
                if(!err) {
                    //write _data to file
                    fs.writeFile(fileDescriptor,stringData,function(err) {
                        if(!err) {
                            fs.close(fileDescriptor,function(err){
                                if(!err) {
                                    callback(false);
                                } else {
                                    callback('data.js 86 Error closing file.');
                                }
                            });
                        } else {
                            callback('data.js 90 Error writing existing file');
                        }
                    });//fs.writeFile
                } else {
                    callback('data.js 94 Error truncating file');
                }
            });//fs.truncate
        } else {
            callback('data.js 98 Could not open file, it may not exist yet.');
        }
    });
};//data.update

/*
Delete the file
*/
data.delete = function(dir,file,callback) {
    fs.unlink(data.baseDir+dir+'/'+file+'.json',function(err) {
        callback(err);
    });
};//data.delete

//exporting module
module.exports = data;