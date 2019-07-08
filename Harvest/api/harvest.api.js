import post from 'request'
import Harvest from 'node-harvest-api'
require('dotenv').config() // loads data from environment file

// main function
console.log('hello')

function sendHarvestID (projectId, projectName) { // similar function to sendSlackID expect its used for harvest
  const harvest = new Harvest(process.env.HARVEST_ACCOUNT_ID, process.env.HARVEST_TOKEN, process.env.HARVEST_APP_NAME); // necessary fields for the Harvest API

  (async () => { // async function that gets the available projects
    let projects = await harvest.projects.all()

    let hID = findProject(projects, projectName)

    if (hID !== null) { // gets rid of capitalization and whitespace in order to best compare the two strings
      post(process.env.TP_URL_HARVEST, { // if the names match it sends the data to the custom webhook in target process

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
      console.log('project was not defined in harvest')
    }
  })()
}

// helper functions

function findProject (projects, projectName) {
  for (let i = 0; i < projects.length; i++) { // currently the best way to cycle through the projects in order to find a project with a similar name
    // can cause problems in the future if the project list gets too big (maybe find a better way to do this??)

    if (equalizeString(projects[i].name) === equalizeString(projectName)) {
      return projects[i].id
    } else {
      return null
    }
  }
}

function equalizeString (str) { // makes checking for project names easier bc it replaces all whitespace and capitalization
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1)
  }).replace(/\s/g, '').toLowerCase()
}

export default sendHarvestID
