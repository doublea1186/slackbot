const request = require("request");
const {WebClient} = require('@slack/web-api');

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
             console.log("we got this far " + sID );

            if (sID !== undefined) {
                request.post(process.env.TP_URL_SLACK, {
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

    sendHarvestID(project_id, hID){
        request.post(process.env.TP_URL_HARVEST, {
            json: {
                id: project_id,
                harvest_id: hID
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


}

module.exports = Taskbot;
