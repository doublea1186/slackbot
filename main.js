const reqlib = require('app-root-path').require;
const express = require('express'); //node express web API
const bodyParser = require('body-parser'); //parses the post request
const app = express().use(bodyParser.json()); // creates express http
const slack = reqlib('Slack/routes/slack.route.js');
const harvest = reqlib('Harvest/routes/harvest.route.js');

// Home page route.
app.get('/', (req, res) => {
    res.send('This is the tunnel created by Ngrok with Http Auth');
});

// Sets server port and logs message on success
app.listen(process.env.PORT || 8080);

slack.startRoute(app); //sets up routes to the slack endpoint
harvest.startRoute(app); //sets up routes to the harvest endpoint
