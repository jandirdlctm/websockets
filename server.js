
const express = require('express');
const WebSocket = require('ws');

const port = process.env.PORT || 3000
var app = express();

app.get('/foobars', function(req,res){
  res.sendStatus(200);
});

app.post('/foobars', function(req,res){
  // create some db record here
  res.sendStatus(201);
  broadcastToAllClients(something);
});

var server = app.listen(port, function(){
  console.log("Server running")
});



// WEBSOCKETS
const wss = new WebSocket.Server({ server: server });

var players = {};

function broadcastToAllClients(data){
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

function sendData(client, data){
  client.send(JSON.stringify(data));
}

wss.on('connection', function connection(newClient) {
  console.log("a new client just connected");
  newClient.on('message', function incoming(data) {
      console.log("Client just sent a message to the server: ", data);
      // broadcastToAllClients(data);
      data = JSON.parse(data);
      if (data.action == "player-join"){
        var playerObject = {
          name: data.playerName,
          color: data.playerColor,
          socket: newClient
        };
        playerObject[data.playerName] = playerObject;
      }
      else if(data.action == "smack-other-player"){
        // who is smacking?
        // who is smacked
        var otherPlayer = players[data.otherPlayer];
        sendData(otherPlayer.socket, {action: "you-got-smacked"})
      }
  });
});



