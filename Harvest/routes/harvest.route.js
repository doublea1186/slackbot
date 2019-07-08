import harvestController from 'Harvest/controller/harvest.controller.js'
require('dotenv').config() // loads data from environment file

function startRoute (app) {
  app.post('/harvest', (req, res) => { // webhook endpoint for when a new project is created and sends an http post request
    harvestController.startController(req, req)

    res.sendStatus(200)
  })

  app.get('/harvest', (req, res) => {
    res.send('This is the Harvest endpoint')
  })
}

export default startRoute
