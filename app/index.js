var auth = require('./auth');
var graph = require('./graph');



var express = require('express');
var app = express();
var path = require('path');
var adal = require('adal-node');
var cookieParser = require('cookie-parser');
var request = require('request');
var Q = require('q');

var AuthenticationContext = adal.AuthenticationContext;

//FROM THE AZURE ACTIVE DIRECTORY INSTALL
//var clientId = 'db568a80-daaa-410c-ac2f-7e214f4b8297';
//var clientSecret = 'T2mRjuth1jXPzQDP0fM9Lzp';


//FROM https://manage.windowsazure.com/cntmedia.com
var clientId = 'fda836cd-c0f6-483c-a843-9ac7db84f37f';
var clientSecret = 'ORuJxWJ4XPaxj3sIf3P1eK5lL55lU684OPQ+ZA/U29o=';
//

var api = '';
var api_response = '';


var authorityHostUrl = 'https://login.windows.net';
var tenant = 'cntmediallc.onmicrosoft.com';
var authorityUrl = authorityHostUrl + '/' + tenant;
//var resource = '00000002-0000-0000-c000-000000000000';
var resource;
var redirectUri = 'http://localhost:3000/';



//graphiApi.get('/v1.0/users', (err, response) => {
//    console.log(response);
//});




var azure = 'https://graph.windows.net/8f704946-3ff7-4fcf-b1aa-12fa9df14037';

var msft_url = 'https://graph.microsoft.com/v1.0/me';
var msft_url2 = 'https://graph.microsoft.com';
var msft_url3 = 'https://graph.windows.net/myorganization/users?api-version[&$filter]';

var msft_url4 = 'https://graph.windows.net/v1.0/myorganization';
var msft_url5 = 'https://graph.microsoft.com/profile';
var msft_url6 = 'https://graph.microsoft.com/v1.0/me/messages';


var context = new AuthenticationContext(authorityUrl);



function createToken(type) {
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
            api = '';
            api = tokenResponse;
            deferred.resolve(tokenResponse);
        }
      })

    return deferred.promise;
};


function _getUserData(){

    var deferred = Q.defer();
    var active_token = token;

    request({
        headers: {
          'cache-control': 'private',
          'auth': {
            'timeout': 6000,
            'bearer': api.accessToken,
        //    'body': '{SomeSerializedJSON}'
          },
        },
        uri: msft_url,
//        body: formData,
        method: 'GET'
      }, function (err, res, body) {
        //it works!
        console.log(body);
    });

//    request({
//    headers: {
//      'Content-Length': contentLength,
//      'Content-Type': 'application/x-www-form-urlencoded'
//    },
//    uri: 'http://myUrl',
//    body: formData,
//    method: 'POST'
//  }, function (err, res, body) {
//    //it works!
//  });


//    request.get(url,
//            {
//                'Auth': {
//                    'Bearer': token
//                }
//            },
//
//            function(error, response, body){
//
//                    if(error){
//                        console.log(error);
//                        console.log(response);
//                        deferred.reject(new Error(error));
//                    }else{
//                        api_response = '';
//                        api_response = body;
//
//                        console.log(response);
//                        console.log(body);
//
//                        deferred.resolve( body );
//                    }
//
//                    return deferred.promise;
//
//                }
//            )


};

function getUserData(token,url){
    var deferred = Q.defer();
    var options = {
        uri: url,
        method: 'GET',
        auth: {
             bearer: token.accessToken,
             sendImmediately: false
      }

    };

    request(options,

    function (error, response, body) {

        if (error) {
            console.log(error);
            deferred.reject(new Error(error));
        }
        else {
            api_response = '';
            api_response = body;
            console.log(body);
            console.log('-----------');
            deferred.resolve(body);
        }


    });

    return deferred.promise;

};




var a = 'https://graph.windows.net/cntmediallc.onmicrosoft.com/users?api-version=1.6';

var b = 'https://graph.windows.net/cntmediallc.onmicrosoft.com/users?api-version=2013-11-08';

var url = 'https://graph.microsoft.com/v1.0/users/cnt@cntmedia.com/messages';


var url_1 = 'https://graph.windows.net/cntmediallc.onmicrosoft.com/domains?api-version=1.6'

var url_2 = 'https://graph.windows.net/cntmedia.com/users?api-version=1.6';

var url_3 = 'https://graph.windows.net/cntmediallc.onmicrosoft.com/domains?api-version=beta'

var url4 = 'https://graph.windows.net/cntmedia.com/tenantDetails?api-version=1.6'

var url5 = 'https://graph.windows.net/cntmediallc.onmicrosoft.com/domains?api-version=1.6'

var url6 = 'https://graph.windows.net/myorganization/users/cntmedia@cntmediallc.onmicrosoft.com/$links/manager?api-version=1.6';


app.get('/',function(req,response){
    createToken('azure')
    .then(
            function(token){
                getUserData(token,url5)
                .then(function(body){
                     var data = JSON.parse(body);
                     //data = data.value[0];
//                    var data = JSON.parse(body.value);
                    //data.businessPhones[0]
                    response.send(data);
                });
                //response.send(Date());

            }
        )
});

//    createToken()
//    .then(
//        function(token){
//
//            graphiApi.authorizedRequest(token.accessToken, 'GET', '/v1.0/me', {}, '', function(data){
//
//                response.send(data);
//            })
//
//            //response.send(token);
//            getUserData(token,msft_url);
//        }
//    );







app.listen(3000);
console.log('up @ ' + Date());
