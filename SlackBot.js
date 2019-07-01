const Request = require("request");
const {WebClient} = require('@slack/web-api');
const Harvest = require('node-harvest-api');

class Taskbot {

    constructor(token, name) {

        const SlackBot = require('slackbots');

        const params = {
            icon_emoji: ':smiley:'
        };
        this.bot = new SlackBot({ //required fields for creating a slackbot (not implemented in the project but offers a variety of additional utility if needed)
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

        (async () => {  //async function to get data from slack API

            let response = await web.users.lookupByEmail({'email': email});

            let sID = response.user.id;

            if (sID !== undefined) {  //sends the data if the username has been successfully received

                Request.post(process.env.TP_URL_SLACK, {
                    json: {
                        id: parseInt(user_id),
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
        }).replace(/\s/g, "").toLowerCase();
    }

    sendHarvestID(project_id, project_name) { //similar function to sendSlackID expect its used for harvest

        const harvest = new Harvest(process.env.HARVEST_ACCOUNT_ID, process.env.HARVEST_TOKEN, process.env.HARVEST_APP_NAME); //necessary fields for the Harvest API

        (async () => { //async function that gets the available projects

            let projects = await harvest.projects.all();

            for (let i = 0; i < projects.length; i++) { //currently the best way to cycle through the projects in order to find a project with a similar name
                //can cause problems in the future if the project list gets too big (maybe find a better way to do this??)
                console.log(this.equalizeString(projects[i].name) + ' ==? ' + this.equalizeString(project_name));

                if (this.equalizeString(projects[i].name) === this.equalizeString(project_name)) { //gets rid of capitalization and whitespace in order to best compare the two strings
                    this.hID = projects[i].name;
                    Request.post(process.env.TP_URL_HARVEST, { //if the names match it sends the data to the custom webhook in target process
                            json: {
                                id: parseInt(project_id),
                                harvest_id: this.hID  //must return an int due to Target Process rules
                            }
                        },

                        (error, res, body) => {
                            if (error) {
                                console.error(error);
                                return
                            }
                            console.log(`statusCode: ${res.statusCode}`);
                        })

                } else { //if no names match then the project is not defined in harvest
                    console.log('project was not defined in harvest');
                }
            }
        })();
    }

}

module.exports = Taskbot;
