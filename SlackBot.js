const Request = require("request");
const {WebClient} = require('@slack/web-api');
const Harvest = require('node-harvest-api')

class Taskbot {

    constructor(token, name) {

        const SlackBot = require('slackbots');

        const params = {
            icon_emoji: ':smiley:'
        };
        this.bot = new SlackBot({
            token: token,
            name: name
        });

        //start handler
        this.bot.on('start', () => {
            this.bot.postMessageToChannel('general', 'hi', params);
        });


        //error handler
        this.bot.on('error', (err) => console.log(err));
    }

    sendSlackID(user_id, email) { //function that finds slack id based off of the passed email parameter
        const web = new WebClient(process.env.BOT_TOKEN);
        (async () => {
            let response = await web.users.lookupByEmail({'email': email});
            console.log(response.user.id);
            let sID = response.user.id;
            console.log("we got this far " + sID);

            if (sID !== undefined) {
                Request.post(process.env.TP_URL_SLACK, {
                    json: {
                        id: user_id,
                        slack_id: sID
                    }
                }, (error, res, body) => {
                    if (error) {
                        console.error(error);
                        return
                    }
                    console.log(`statusCode: ${res.statusCode}`);
                    console.log(body)
                })
            }
        })();
    }

    equalizeString(str) { //makes checking for project names easier bc it replaces all whitespace and capitalization
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1);
        }).replace(/\s/g, "");
    }

    sendHarvestID(project_id, project_name) {
        const harvest = new Harvest(process.env.HARVEST_ACCOUNT_ID, process.env.HARVEST_TOKEN, process.env.HARVEST_APP_NAME);
        (async () => {
            let projects = await harvest.projects.all();
            for (let i = 0; i < projects.length; i++) {
                console.log(this.equalizeString(projects[i].name) + ' ==? ' + this.equalizeString(project_name));
                if (this.equalizeString(projects[i].name) == this.equalizeString(project_name)) {
                    this.hID = projects[i].name;

                    Request.post(process.env.TP_URL_HARVEST, {
                            json: {
                                id: parseInt(project_id),
                                harvest_id: parseInt(this.hID)
                            }
                        },
                        (error, res, body) => {
                            if (error) {
                                console.error(error);
                                return
                            }
                            console.log(`statusCode: ${res.statusCode}`);
                            console.log(body);
                        })

                } else {
                    console.log('project was not defined in harvest');
                }
            }
        })();
    }


}

module.exports = Taskbot;
