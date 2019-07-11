import Harvest from 'node-harvest-api';
require('dotenv').config();

const harvest = new Harvest(process.env.HARVEST_ACCOUNT_ID, process.env.HARVEST_TOKEN, process.env.HARVEST_APP_NAME); // declare variable as a global so you can use it only once on each function

async function getProjects () {
  const harvestProjects = await harvest.projects.all()
    .catch(error => error);

  return harvestProjects;
}

export default {
  getProjects
};
