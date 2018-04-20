const express = require('express');
const SocketServer = require('ws');
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });

let numUsers = 0;

//Randomly chooses from the four colours, for the usernames
chooseColour = function() {
  let colours = ['red', 'blue', 'green', 'purple'];
  let index = Math.floor(Math.random() * 4);
  return colours[index];
}

//Function that sends a message to every client
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {

    if (client.readyState === SocketServer.OPEN) {
      client.send(data);
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  numUsers++;

  //when a new client connects, here we send back the colour for their username
  let newUserColourObj = {type: 'newUserColour', colour: chooseColour()};
  ws.send(JSON.stringify(newUserColourObj));

  //And then send out the new number of users to every client
  let newUserObj = {type: 'postNumUser', content: numUsers};
  wss.broadcast(JSON.stringify(newUserObj));

  //Upon receiving a message, send out the message of the appropriate type to every client
  ws.on('message', function incoming(data) {

    let messageObj = JSON.parse(data);
    let tempMessageObj;
    let newId = uuidv4();

    if (messageObj.type === 'postNotification') {
      tempMessageObj = {id: newId, content: messageObj.content, username: messageObj.username, type: 'incomingNotification', colour: messageObj.colour};
    }

    if (messageObj.type === 'postMessage') {
      tempMessageObj = {id: newId, content: messageObj.content, username: messageObj.username, type: 'incomingMessage', colour: messageObj.colour};
    }

    messageObj = tempMessageObj;
    wss.broadcast(JSON.stringify(messageObj));

  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    numUsers--;
    let oneLessUserObj = {type: 'postNumUser', content: numUsers}
    wss.broadcast(JSON.stringify(oneLessUserObj));
    console.log('Client disconnected');
  });
});

