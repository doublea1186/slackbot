require('dotenv').config({path: require('find-config')('.env')}); //loads data from environment file
const reqlib = require('app-root-path').require;
const tpProject = reqlib('Harvest/api/harvest.api.TPProjectData.js');
const harvestAPI = reqlib('Harvest/api/harvest.api.js');

function startController(req, res) {

    let project = new tpProject(req.body.ProjectName, req.body.ProjectID);

    try {

        project.setID(harvestAPI.sendHarvestID(project.getID(), project.getName()));

    } catch (error) {

    }
}

module.exports = {
    startController: startController
};
