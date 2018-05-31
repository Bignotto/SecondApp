/*
* The Big Game Catalog
*
* Thiago Bignotto
* May, 21st 2018
*
* Configuration file
*/

/*
* The idea behind this configuration file is to have a configuration for testing purposes and for
* production purposes. The way the app got to know wich environment it is running is passed using
* a environment variable from the system.
*/

//container
var appConfig = {};

appConfig.production = {
    'httpPort' : 5000,
    'httpsPort' : 5001,
    'envName' : 'production',
    'hashSecret' : 'nonono'
};

appConfig.testing = {
    'httpPort' : 3000,
    'httpsPort' : 3001,
    'envName' : 'testing',
    'hashSecret' : 'nonono'
};

//determining wich config variables to export based on the environment variable
var chosenConfig = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

//check if there is a config variables for the chosen environment otherwise default testing environment
var configToExport = typeof(appConfig[chosenConfig]) == 'object' ? appConfig[chosenConfig] : appConfig.testing;

//export config
module.exports = configToExport;