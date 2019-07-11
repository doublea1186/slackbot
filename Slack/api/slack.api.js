import { WebClient } from '@slack/web-api';
require('dotenv').config(); // loads data from environment file

const web = new WebClient(process.env.BOT_TOKEN);

async function getUsers (email) {
  const users = await web.users.lookupByEmail({ 'email': email })
    .catch(error => error);
  return users;
}

export default {
  getUsers
};
