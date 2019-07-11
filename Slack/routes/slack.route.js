import slackController from './../../Slack/controller/slack.controller.js';
import express from 'express';
require('dotenv').config(); // loads data from environment file
let router = express.Router();

// Creates the endpoint at the /slack path for our webhook when a new user is created and finds the associated slack ID
router.post('/', (req, res) => slackController.startController(req, res)
  .then(() => res.sendStatus(200))
  .catch(error => error));
// Returns a '200 OK' response to all requests

router.get('/', (req, res) => { // creates the page I think
  res.send('This is the Slack endpoint');
});

export default router;
