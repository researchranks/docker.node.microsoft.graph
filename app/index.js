var express = require('express');
var app = express();
var adal = require('adal-node');
var request = require('request');
var Q = require('q');

//custom requires
var url = require('./url');



var AuthenticationContext = adal.AuthenticationContext;

//FROM THE AZURE ACTIVE DIRECTORY INSTALL
//var clientId = 'db568a80-daaa-410c-ac2f-7e214f4b8297';
//var clientSecret = 'T2mRjuth1jXPzQDP0fM9Lzp';


//FROM https://manage.windowsazure.com/cntmedia.com
var clientId = 'fda836cd-c0f6-483c-a843-9ac7db84f37f';
var clientSecret = 'ORuJxWJ4XPaxj3sIf3P1eK5lL55lU684OPQ+ZA/U29o=';
//
var debug_token = '';
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






var context = new AuthenticationContext(authorityUrl);




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
//            console.log(body);
//            console.log('-----------');
            deferred.resolve(body);
        }


    });

    return deferred.promise;

};


function getDomains(data){

    var domains = [];

    for(var i in data.value){
        console.log(
             data.value[i].name
        );
        domains.push(data.value[i].name);
    }

    return domains;
}



app.get('/',function(req,response){
    api.createToken('azure')
    .then(
            function(token){
                getUserData(token,url[7])
                .then(function(body){
                     var data = JSON.parse(body);
                     //data = data.value[0];
//                    var data = JSON.parse(body.value);
                    //data.businessPhones[0]

        //SEND ALL THE DATA
        //response.send(data);


    response.send(
            getDomains(data)
        );


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
