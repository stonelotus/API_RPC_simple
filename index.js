console.log("Hello there!");
const express = require('express');
var fetch = require('node-fetch');
require('dotenv').config();
const app = express();

app.listen(3000,() => console.log('listening at 3000 rn'));     // works on port 3000, http://localhost:3000/
app.use(express.static('public'));                              // serving what's in "public" folder


app.get('/brands', async (request, response) => {               // method get_brands

const fetchResponse = await fetch('https://app.socialinsider.io/api', {     // fetch getbrands data from API
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.API_KEY,
    },
    body: JSON.stringify({"jsonrpc": "2.0", "id": 0, "method": "partner_api.get_brands", "params": {"projectname" : "Automotive"}})
});
    const jsonrpc = await fetchResponse.json();
  //  console.log(jsonrpc);
    response.json(jsonrpc);
});

app.get('/brandData/:startDate/:stopDate/:brandName',async (request, response) => {   // method get_brand_data
  console.log("Received brandname test in backend from client-side: " + request.params.brandName);                               //sending parameters through url


  const fetchResponse = await fetch('https://app.socialinsider.io/api', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + process.env.API_KEY,
      },
      body: JSON.stringify(getBrandDataString(request.params.brandName.toString(),{"startDate":request.params.startDate,"stopDate":request.params.stopDate})),
  });
      const jsonrpc = await fetchResponse.json();
    //  console.log(jsonrpc);
      response.json(jsonrpc);
});


function getBrandDataString(brandname,timestamps) {             //    return string for API depending on start/stop dates
  if(timestamps.startDate != -1 && timestamps.stopDate != -1)   // if(start||stop == -1)  we return call with "date" param, else without
  {
    return {
      "jsonrpc": "2.0",
      "id": 0,
      "method": "partner_api.get_brand_data",
      "params":{
              "projectname":"Automotive",
              "brandname": brandname,
               "date": {
                 "start": parseInt(timestamps.startDate),
                 "end" : parseInt(timestamps.stopDate),
               }
          }
    }
  } else {
      return {
        "jsonrpc": "2.0",
        "id": 0,
        "method": "partner_api.get_brand_data",
        "params":{
                "projectname":"Automotive",
                "brandname": brandname,
            }
      }
  }
}


/////////////////////////////////////////

/*var request = require('request');

var headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer interviu'
};

var dataString = '{"jsonrpc": "2.0", "id": 0, "method": "partner_api.get_brands", "params": {"projectname" : "Automotive"}}';

var options = {
    url: 'https://app.socialinsider.io/api',
    method: 'POST',
    headers: headers,
    body: dataString
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
}
*/
//request(options, callback);

//////////////////////////////////////////
