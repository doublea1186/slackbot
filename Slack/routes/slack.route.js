require('dotenv').config({path: require('find-config')('.env')}); //loads data from environment file
const reqlib = require('app-root-path').require;
const slackAPI = reqlib('Slack/api/slack.api.js');
const tpUser = reqlib('Slack/api/slack.api.TPUserData.js');


function startRoute(app) {


// Creates the endpoint at the /slack path for our webhook when a new user is created and finds the associated slack ID
    app.post('/slack', (req, res) => {

        let user = new tpUser(req.body.EntityName, "ockster1186@gmail.com", parseInt(req.body.EntityID));

        user.getTPData();

        try {
            user.setID(slackAPI.sendSlackID(user.getID(), user.getEmail()));
        } catch (error) {
            console.log(error);
        }
        // Returns a '200 OK' response to all requests
        res.sendStatus(200);
    });

    app.get('/slack', (req, res) => {  //creates the page I think
        res.send('This is the Slack endpoint');
    });


}

module.exports = {
    startRoute: startRoute
};
