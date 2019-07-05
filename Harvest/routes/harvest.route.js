const reqlib = require('app-root-path').require;
let taskbot = reqlib('Harvest/controller/harvest.controller.js');

taskbot.startServer();
