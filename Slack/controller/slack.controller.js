require('dotenv').config({path: require('find-config')('.env')}); //loads data from environment file
const reqlib = require('app-root-path').require;
const slackAPI = reqlib('Slack/api/slack.api.js');
const tpUser = reqlib('Slack/api/slack.api.TPUserData.js');

function startController(req, res) {

    let user = new tpUser(req.body.EntityName, req.body.EntityEmail, parseInt(req.body.EntityID));

    try {

        user.setID(slackAPI.sendSlackID(user.getID(), user.getEmail()));

    } catch (error) {

    }

}

module.exports = {
    startController: startController
};
