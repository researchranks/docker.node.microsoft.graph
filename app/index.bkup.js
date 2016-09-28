//https://github.com/AzureAD/azure-activedirectory-library-for-nodejs/blob/master/sample/client-credentials-sample.js

//https://github.com/Azure-Samples/active-directory-node-graphapi-oauth2-0-access/blob/master/Node/Node/public/js/app.js


var express = require('express');
var app = express();
var path = require('path');
var adal = require('adal-node');
var cookieParser = require('cookie-parser');
var request = require('request');
var Q = require('q');

var AuthenticationContext = adal.AuthenticationContext;


var clientId = 'db568a80-daaa-410c-ac2f-7e214f4b8297';
var clientSecret = 'T2mRjuth1jXPzQDP0fM9Lzp';

var api = '';
var api_response = '';


function data(){
    return Date();
};




var authorityHostUrl = 'https://login.windows.net';
var tenant = 'cntmediallc.onmicrosoft.com';
var authorityUrl = authorityHostUrl + '/' + tenant;
var resource = '00000002-0000-0000-c000-000000000000';
var redirectUri = 'http://localhost:3000/getAToken';

var context = new AuthenticationContext(authorityUrl);




function getToken(){

context.acquireTokenWithClientCredentials(resource, clientId, clientSecret, function(err, tokenResponse) {
  if (err) {
    console.log('well that didn\'t work: ' + err.stack);
  } else {
//      console.log(tokenResponse);
      api = '';
      api = tokenResponse;
      return  tokenResponse;
  }
});

};



getToken();

function _gd() {
  var deferred = Q.defer();

  // Make a request to get all users in the tenant. Use $select to only get
  // necessary values to make the app more performant.
  request.get('https://graph.microsoft.com/v1.0/me', {
    auth: {
      bearer: api.accessToken
    }
  }, function (err, response, body) {
    var parsedBody = JSON.parse(body);

    if (err) {
      deferred.reject(err);
    } else if (parsedBody.error) {
      deferred.reject(parsedBody.error.message);
    } else {
      // The value of the body will be an array of all users.
      deferred.resolve(parsedBody.value);
    }
  });

  return deferred.promise;
};


var msft_url = 'https://graph.microsoft.com/v1.0/me';


function getData(){

    request.get(msft_url, {
        'auth': {
            'bearer': api.accessToken
            }
        },

    function (error, response, body){
        return body;
  });


//app.get('/token',function(req,res){
//    res.status(200).send(
//        data()
//    );
//});



var url = '';

url +=
authorityHostUrl +
'/'+ tenant +
'/oauth2'+
'/'+ api.accessToken +






//        request.get('https://graph.microsoft.com/v1.0/me',{
//    auth: {
//      bearer: api.accessToken
//    }
//},
//    function(error,response,body){
//        api_response = body;
//    }
//
//);




app.get('/',function(req,res){
    res.status(200).send(
//        api.accessToken
        getData()
    )
});


app.listen(3000);
console.log('up @ ' + Date());
