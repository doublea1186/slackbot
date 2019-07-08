import controller from 'Slack/controller/slack.controller.js'
require('dotenv').config() // loads data from environment file

function startRoute (app) {
  // Creates the endpoint at the /slack path for our webhook when a new user is created and finds the associated slack ID
  app.post('/slack', (req, res) => {
    controller.startController(req, res)

    // Returns a '200 OK' response to all requests
    res.sendStatus(200)
  })

  app.get('/slack', (req, res) => { // creates the page I think
    res.send('This is the Slack endpoint')
  })
}

export default startRoute
