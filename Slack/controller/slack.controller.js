import post from 'request'
import WebClient from '@slack/web-api'
require('dotenv').config() // loads data from environment file

function startController (req, res) {
  try {
    sendSlackID(req.body.EntityID, req.body.EntityEmail)
  } catch (error) {

  }
}

async function sendSlackID (userID, email) {
  // function that finds slack id based off of the passed email parameter

  const web = new WebClient(process.env.BOT_TOKEN);

  (async () => {
    // async function to get data from slack API

    let response = await web.users.lookupByEmail({ 'email': email })

    let sID = response.user.id

    if (sID !== undefined) {
      // sends the data if the username has been successfully received
      post(process.env.TP_URL_SLACK, {
        json: {
          id: parseInt(userID),
          slack_id: sID
        }

      }, (error) => {
        if (error) {
        }
      })
    }
  })()
}

export default startController
