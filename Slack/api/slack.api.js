require('dotenv').config({path: require('find-config')('.env')}); //loads data from environment file
const Request = require("request");
const {WebClient} = require('@slack/web-api');

//main function
let sendSlackID = async function sendSlackID(user_id, email) { //function that finds slack id based off of the passed email parameter

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

            }, (error, res,) => {
                if (error) {
                    return;
                }
            })
        }
    })();
}


module.exports = {
    sendSlackID: sendSlackID
};


