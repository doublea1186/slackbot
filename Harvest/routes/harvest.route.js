require('dotenv').config({path: require('find-config')('.env')}); //loads data from environment file
const reqlib = require('app-root-path').require;
const tpProject = reqlib('Harvest/api/harvest.api.TPProjectData.js');
const harvestAPI = reqlib('Harvest/api/harvest.api.js');
const express = require('express'); //node express web API
const bodyParser = require('body-parser'); //parses the post request
const app = express().use(bodyParser.json()); // creates express http server

//startServer();

function startRoute() {

// // Home page route.
//     app.get('/', (req, res) => {
//         res.send('This is the tunnel created by Ngrok with Http Auth');
//     });
//
// // Sets server port and logs message on success
//     app.listen(process.env.PORT || 8080);

    app.post('/harvest', (req, res) => {  //webhook endpoint for when a new project is created and sends an http post request
        console.log('hello');
        let project = new tpProject("world domination", req.body.ProjectID);
        // project.dataReceived();

        try {
            project.setID(harvestAPI.sendHarvestID(project.getID(), project.getName()));
        } catch (error) {
            console.log("There was an error " + error);
        }

        res.sendStatus(200);
    });

    app.get('/harvest', (req, res) => {
        res.send('This is the Harvest endpoint');

    });
}

// function closeServer() {
//     process.kill(process.pid, 'SIGTERM');
// }

module.exports = {
    startRoute: startRoute
    //  closeServer: closeServer
};
