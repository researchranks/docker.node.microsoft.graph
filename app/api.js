var request = require('request');
var Q = require('q');
var AuthenticationContext = adal.AuthenticationContext;
var authorityHostUrl = 'https://login.windows.net';
var tenant = 'cntmediallc.onmicrosoft.com';
var authorityUrl = authorityHostUrl + '/' + tenant;
//var resource = '00000002-0000-0000-c000-000000000000';
var resource;
var redirectUri = 'http://localhost:3000/';


var api = {}

api.createToken = function(type) {
    if(!type){
        resource = 'https://graph.microsoft.com';
    }else if(type === 'azure'){
        resource = 'https://graph.windows.net';
    }

    var deferred = Q.defer();

    context.acquireTokenWithClientCredentials(resource, clientId, clientSecret, function(error, tokenResponse) {
        if (error) {
            deferred.reject(new Error(error));
        }
        else {
            debug_token = '';
            debug_token = tokenResponse;
            deferred.resolve(tokenResponse);
        }
      })

    return deferred.promise;
};

module.exports = api;
