'use strict';
const express = require("express");
const server = express();
const fs = require('fs');
const bot = require("./index");
const { parse } = require('querystring');
const passwordHash = require('password-hash');
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.post('/setsession', (req, res) => {
  res.cookie('loggedIn', true)
});

server.get('/bankstate', (req, res) => {
  res.sendFile(__dirname + '/bankstate.html');
});

server.post('/contact', (req, res) => {
  let body = '';
  var data;
  req.on('data', chunk => {
      body += chunk.toString();
  });
  req.on('end', () => {
      data = parse(body);
      res.redirect("/")
  });
  setTimeout(function(){
    bot.contact(data);
  },50);
});

server.get('/index.html', function (req, res) {
  res.send('I want this string to return to the client');
});

function keepAlive() {
  server.listen(3000, () => { console.log("Server is Ready!") });
}

server.post('/verify', jsonParser, async (req, res) => {
  var data;
  data = req.body;
  var isCorrect = passwordHash.verify(data.plaintext, data.hashed);
  res.send(isCorrect);
});

server.post('/hash', jsonParser, async (req, res) => {
  var data;
  data = req.body
  console.log(data.plaintext)
  var plaintext = data.plaintext;
  var hash = passwordHash.generate(plaintext);
  await fs.readFile('logins.json', 'utf8', function(err, data1){
    data1 = JSON.parse(data1);
    var index = data1.findIndex(x => x.id == data.id);
    data1[index].password = hash;
    fs.writeFile('logins.json', JSON.stringify(data1), 'utf8', function(){});
  });
  res.send();
});

server.use(express.static('public'))
server.use(express.static('./'))

module.exports.keepAlive = keepAlive();
module.exports.server = server;