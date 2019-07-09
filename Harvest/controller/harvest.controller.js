import Harvest from 'node-harvest-api'
import Request from 'request'
require('dotenv').config() // loads data from environment file

function startController (req, res) {
  try {
    sendHarvestID(req.body.ProjectID, req.body.ProjectName)
  } catch (error) {

  }
}
async function sendHarvestID (projectId, projectName) {
  const harvest = new Harvest(process.env.HARVEST_ACCOUNT_ID, process.env.HARVEST_TOKEN, process.env.HARVEST_APP_NAME); // necessary fields for the Harvest API

  (async () => { // async function that gets the available projects
    let projects = await harvest.projects.all()

    let hID = findProject(projects, projectName).id

    if (hID !== null) { // gets rid of capitalization and whitespace in order to best compare the two strings
      Request.post(process.env.TP_URL_HARVEST, { // if the names match it sends the data to the custom webhook in target process
        json: {
          id: parseInt(projectId),
          harvest_id: hID // must return an int due to Target Process rules
        }
      },

      (error, res) => {
        if (error) {
          console.error(error)
          return
        }
        console.log(`statusCode: ${res.statusCode}`)
      })
    } else { // if no names match then the project is not defined in harvest
    }
  })()
}
function findProject (projects, projectName) {
  return projects.find(project => equalizeString(project.name) === equalizeString(projectName))
}

function equalizeString (string) {
  return string
    .replace(/\w\S*/g, text => `${text.charAt(0).toUpperCase()}${text.substr(1)}`)
    .replace(/\s/g, '')
    .toLowerCase() // For readability and clean structure. This line will go over the 100 char line max base off of eslint standards.
}

export default {
  startController
}
