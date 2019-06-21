const TP = require('./TPData.js');
 // const bot = require('./SlackBot.js'); //retrieve instance of taskbot class from Slackbot.js
 // const bot_token = 'xoxb-670439901680-659025322114-nGwwG9EJib2muyjTX1IkzVRA'; //bot token gotten from Slack
 // const bot_name = 'id-bot'; //bot name made from Slack

//  let id_bot = new bot(bot_token, bot_name);
    let user = new TP();
    user.getTPData();



