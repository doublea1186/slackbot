 // require('dotenv').config();
 //
 // const express = require('express');
 // const app = express();
 // const path = require('path');
 // const ngrok = require('ngrok');
 // const user = process.env.USER;
 // const password = process.env.PASSWORD;


// Imports dependencies and set up http server
  const express = require('express');
  const bodyParser = require('body-parser');
  const app = express().use(bodyParser.json()); // creates express http server
 app.get('/', (req, res) => {  //creates the page I think
  res.send('This is the tunnel created by Ngrok with Http Auth');
 });

 // Sets server port and logs message on success
 app.listen(process.env.PORT, () => console.log(app.listen(process.env.PORT).address().port));


 // Creates the endpoint for our webhook
 app.post('/', (req, res) => {

  let body = req.body;
  if (body == '' || body.object == null){
   res.status(200).send('Event_Received');
  }
  // Checks this is an event from a page subscription
  if (body.object === 'page') {

   // Iterates over each entry - there may be multiple if batched
   body.entry.forEach(function(entry) {

    // Gets the message. entry.messaging is an array, but
    // will only ever contain one message, so we get index 0
    let webhook_event = entry.messaging[0];
    console.log(webhook_event);
   });

   // Returns a '200 OK' response to all requests
   res.status(200).send('EVENT_RECEIVED');
  } else {
   // Returns a '404 Not Found' if event is not from a page subscription
   res.sendStatus(404);
  }

 });






//   app.get('/', (req, res) => {
//      console.log(req);
//      res.send('This is the tunnel created by Ngrok with Http Auth');
//  });
//
// const server = app.listen(process.env.PORT, () => {
//     console.log('Express listening at ', server.address().port);
// })






// ngrok.connect({
//     proto : 'http',
//     addr : process.env.PORT
// //    auth : `${user}:${password}`
// }, (err, url) => {
//     if (err) {
//         console.error('Error while connecting Ngrok',err);
//         return new Error('Ngrok Failed');
//     }
//     else {
//         console.log('Tunnel Created -> ', url);
//         console.log('Tunnel Inspector ->  http://127.0.0.1:4040');
//     }
// });
