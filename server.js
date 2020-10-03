'use strict';
const express = require("express");
const server = express();
const fs = require('fs');
const bot = require("./index");
const { parse } = require('querystring');

server.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.get('/data', (req, res) => {
  bot.data(function(data){
    res.send(data);
  });
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

server.use(express.static('public'))

module.exports = keepAlive;