import harvestController from './../../Harvest/controller/harvest.controller.js';
import express from 'express';
require('dotenv').config(); // loads data from environment file
let router = express.Router();

router.post('/', (req, res) => harvestController.startController(req, res) // webhook endpoint for when a new project is created and sends an http post request
  .then(() => res.sendStatus(200))
  .catch(error => error));

router.get('/', (req, res) => {
  res.send('This is the Harvest endpoint');
});

export default router;
