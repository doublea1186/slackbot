const response = require("request");
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

        //message handler
        this.bot.on('message', (data) => {
            if (data.type !== 'message') {
                return;
            }
            console.log(data.text);
        });
    }

    getSlackID(email) { //function that finds slack id based off of the passed email parameter
        const web = new WebClient(process.env.BOT_TOKEN);
        (async () => {
        let response = await web.users.lookupByEmail({'email': email});
        console.log(response.user.id);
        })();
        return response;
    }

    sendSlackID(email){ //after finding the slack ID, maps it back to Target Process in the custom field
        this.getSlackID(email);
    }

}

module.exports = Taskbot;
