const express = require("express");
const server = express();
const fs = require('fs');

server.all('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/ajaxURL', function (req, res) {
  res.send('I want this string to return to the client');
});

function keepAlive() {
  server.listen(3000, () => { console.log("Server is Ready!") });
}

module.exports = keepAlive;