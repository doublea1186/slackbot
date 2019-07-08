require('dotenv').config({path: require('find-config')('.env')}); //loads data from environment file
import { require as reqlib } from 'app-root-path';
import slackAPI from 'Slack/api/slack.api.js';
import tpUser from 'Slack/api/slack.api.TPUserData.js';

function startController(req, res) {

    let user = new tpUser(req.body.EntityName, req.body.EntityEmail, parseInt(req.body.EntityID));

    try {

        user.setID(slackAPI.sendSlackID(user.getID(), user.getEmail()));

    } catch (error) {

    }

}

export const startController = startController;
