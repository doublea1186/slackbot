class taskbot {

    constructor(token, name) {
        const SlackBot = require('slackbots');
        const params = {
            icon_emoji: ':smiley:'
        };
        const bot = new SlackBot({
            token: token,
            name: name
        });

         //start handler
            bot.on('start', () => {
                bot.postMessageToChannel('general', 'hi', params);
            });


        //error handler
            bot.on('error', (err) => console.log(err));

            //message handler
        bot.on('message', (data) =>{
            if (data.type !== 'message'){
                return;
            }
            console.log(data.text);
        });
    }
}
 module.exports = taskbot;