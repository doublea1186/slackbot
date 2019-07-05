const reqlib = require('app-root-path').require;
let taskbot = reqlib('Slack/controller/slack.controller.js');

taskbot.startServer();



