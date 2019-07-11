import express from 'express'; // node express web API
import { json } from 'body-parser'; // parses the post request
import slack from './Slack/routes/slack.route.js';
import harvest from './Harvest/routes/harvest.route.js';
const app = express().use(json()); // creates express http
require('dotenv').config(); // loads data from environment file

// Home page route.
app.get('/', (req, res) => {
  res.send('This is the tunnel created by Ngrok with Http Auth');
});

// Sets server port and logs message on success
app.listen(process.env.PORT || 8080);
app.use('/harvest', harvest);
app.use('/slack', slack);
