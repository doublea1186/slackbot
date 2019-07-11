import Request from 'request';
import SlackAPI from '../../Slack/api/slack.api';

function startController (req, res) {
  return sendSlackID(req.body.EntityID, req.body.EntityEmail);
}

async function sendSlackID (userID, email) {
  // function that finds slack id based off of the passed email parameter
  const response = await SlackAPI.getUsers(email);
  const sID = response.user.id;

  if (sID !== undefined) {
    // sends the data if the username has been successfully received
    Request.post(process.env.TP_URL_SLACK, {
      json: {
        id: parseInt(userID), 
        slack_id: sID
      }
    },
    (error, res) => {
      if (error) {
        console.error(error);
        return error;
      }
      return res;
    });
  } return Promise.reject(new Error('no user found'));
}

export default {
  startController
};
