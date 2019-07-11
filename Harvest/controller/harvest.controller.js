import Request from 'request';
import HarvestAPI from '../../Harvest/api/harvest.api.js';
require('dotenv').config(); // loads data from environment file

function startController (req, res) {
  return sendHarvestID(req.body.ProjectID, req.body.projectName);
}

async function sendHarvestID (projectId, projectName) {
  const projects = await HarvestAPI.getProjects();

  if (projects) {
    const hID = findProject(projects, projectName).id;

    if (hID !== null) { // gets rid of capitalization and whitespace in order to best compare the two strings
      Request.post(process.env.TP_URL_HARVEST, { // if the names match it sends the data to the custom webhook in target process
        json: {
          id: parseInt(projectId),
          harvest_id: hID // must return an int due to Target Process rules
        }
      },

      (error, res) => {
        if (error) {
          console.error(error);
          return error;
        }
        return res;
      });
    }
  } return Promise.reject(new Error('no projects found'));
}
function findProject (projects, projectName) {
  return projects.find(project => equalizeString(project.name) === equalizeString(projectName));
}

function equalizeString (string) {
  return string
    .replace(/\w\S*/g, text => `${text.charAt(0).toUpperCase()}${text.substr(1)}`)
    .replace(/\s/g, '')
    .toLowerCase(); // For readability and clean structure. This line will go over the 100 char line max base off of eslint standards.
}

export default {
  startController
};
