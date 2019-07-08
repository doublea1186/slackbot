require('dotenv').config({path: require('find-config')('.env')}); //loads data from environment file
const reqlib = require('app-root-path').require;
const tpProject = reqlib('Harvest/api/harvest.api.TPProjectData.js');
const harvestAPI = reqlib('Harvest/api/harvest.api.js');
const harvestController = reqlib('Harvest/controller/harvest.controller.js');


function startRoute(app) {

    app.post('/harvest', (req, res) => {  //webhook endpoint for when a new project is created and sends an http post request

        harvestController.startController(req, req);

        res.sendStatus(200);
    });

    app.get('/harvest', (req, res) => {
        res.send('This is the Harvest endpoint');

    });
}

module.exports = {
    startRoute: startRoute
};
