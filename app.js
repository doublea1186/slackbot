// Imports dependencies and set up http server
require('dotenv').config() //loads data from environment file
const express = require('express'); //node express web API
const bodyParser = require('body-parser'); //parses the post request
const tp = require('TPData'); //custom class used to store information recieved from target process
const app = express().use(bodyParser.json()); // creates express http server

app.get('/', (req, res) => {  //creates the page I think
    res.send('This is the tunnel created by Ngrok with Http Auth');
});

// Sets server port and logs message on success
app.listen(process.env.PORT || 8080);


// Creates the endpoint at the default / path for our webhook

app.post('/', (req, res) => {
    console.log(req.body);
    let user = new tp(req.body.EntityName, req.body.EntityEmail, req.body.EntityID);
    user.user_created();
    user.getTPData();
        // Returns a '200 OK' response to all requests
});

