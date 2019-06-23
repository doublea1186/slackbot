// Imports dependencies and set up http server
require('dotenv').config() //loads data from environment file
const express = require('express'); //node express web API
const bodyParser = require('body-parser'); //parses the post request
const tpUser = require('./TPUserData.js'); //custom class used to store information on users received from target process
const tpProject = require('./TPProjectData.js'); //custom class used to store information on projects received from target process
const app = express().use(bodyParser.json()); // creates express http server

app.get('/', (req, res) => {
    res.send('This is the tunnel created by Ngrok with Http Auth');
});

// Sets server port and logs message on success
app.listen(process.env.PORT || 8080);


// Creates the endpoint at the /slack path for our webhook when a new user is created

app.post('/slack', (req, res) => {
    console.log(req.body);
   let user = new TP(req.body.EntityName, req.body.EntityEmail, req.body.EntityID);
   user.user_created();
   user.getTPData();
        // Returns a '200 OK' response to all requests
});

app.get('/slack', (req, res) => {  //creates the page I think
    res.send('This is the Slack endpoint');
});


app.post('/harvest', (req, res) => {  //webhook endpoint for when a new project is created and sends an http post request
    let project = new tpProject(req.body.ProjectName, req.body.ProjectID);
    console.log(req.body);

});

app.get('/harvest', (req, res) => {
   res.send('This is the Harvest endpoint');

});

