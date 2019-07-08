require('dotenv').config(); //loads data from environment file
import harvestAPI from 'Harvest\api\harvest.api.js';
import tpProject from 'Harvest\api\harvest.api.TPProjectData.js';

function startController(req, res) {

    let project = new tpProject(req.body.ProjectName, req.body.ProjectID);

    try {

        project.setID(harvestAPI.sendHarvestID(project.getID(), project.getName()));

    } catch (error) {

    }
}

export const startController;
