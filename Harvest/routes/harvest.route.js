require('dotenv').config({path: require('find-config')('.env')}); //loads data from environment file
import { require as reqlib } from 'app-root-path';
import tpProject from 'Harvest/api/harvest.api.TPProjectData.js';
import harvestAPI from 'Harvest/api/harvest.api.js';
import harvestController from 'Harvest/controller/harvest.controller.js';


function startRoute(app) {

    app.post('/harvest', (req, res) => {  //webhook endpoint for when a new project is created and sends an http post request

        harvestController.startController(req, req);

        res.sendStatus(200);
    });

    app.get('/harvest', (req, res) => {
        res.send('This is the Harvest endpoint');

    });
}

export const startRoute = startRoute;
