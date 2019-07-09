import harvestController from './../../Harvest/controller/harvest.controller.js'
import express from 'express'
require('dotenv').config() // loads data from environment file
let router = express.Router()

router.post('/', (req, res) => { // webhook endpoint for when a new project is created and sends an http post request
  harvestController.startController(req, req)

  res.sendStatus(200)
})

router.get('/', (req, res) => {
  res.send('This is the Harvest endpoint')
})

export default router
