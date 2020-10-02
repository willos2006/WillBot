module.exports = async (client, configFile) => {
  const Discord = require('discord.js');
  const embed = new Discord.MessageEmbed();
  var fs = require('fs');
  const settings = require('../settings/settings.json');
  var prefix = settings.prefix;
  prefix = settings.prefix
  client.on('message', async msg => {
    embed.setFooter(msg.author.tag)
  embed.setColor(0x0046ff);
    if (msg.content.toLowerCase() == prefix + 'wallet') {
      fs = require('fs');
      fs.readFile('shop.json', 'utf8', function readFileCallback(err, data) {
        var count = 0;
        stuff = JSON.parse(data);
        stuff.forEach(m => {
          if (m.userID == msg.author.id) {
            count += 1;
          }
        });
        if (count == 0) {
          var json = {
            userID: msg.author.id,
            lastSeen: 0,
            money: 0,
            inv: []
          };
          stuff.push(json);
          stuff = JSON.stringify(stuff);
          fs.writeFile('shop.json', stuff, 'utf8', function() { });
        }
      });
      setTimeout(function() {
        fs.readFile('shop.json', 'utf8', function readFileCallback(
          err,
          data
        ) {
          stuff = JSON.parse(data);
          var items =
            stuff[stuff.findIndex(x => x.userID == msg.author.id)].inv;
          var totalAssets = 0;
          fs.readFile('shopInventory.json', 'utf8', function(err, data) {
            var stuffInv = JSON.parse(data);
            items.forEach(m => {
              var index = stuffInv.findIndex(x => x.id == m);
              totalAssets += stuffInv[index].sellPrice;
            });
          });
          setTimeout(function() {
            stuff.forEach(m => {
              if (m.userID == msg.author.id) {
                embed.setTitle('Wallet Balance');
                embed.setDescription(
                  'Your current balance is: `£' +
                  m.money.toFixed(2) +
                  '`\nYou have `£' +
                  totalAssets.toFixed(2) +
                  '` in assets'
                );
                msg.channel.send({ embed });
              }
            });
          }, 10);
        });
      }, 300); /*
      embed.setTitle("Command Disabled");
      embed.setDescription("Sorry, this command is disabled at the moment for reason:\n`WIP`");
      msg.channel.send({embed});*/
    }
    if (msg.content.toLowerCase() == prefix + 'regular') {
      var fs = require('fs');
      fs.readFile('shop.json', 'utf8', function readFileCallback(err, data) {
        var count = 0;
        var stuff = JSON.parse(data);
        stuff.forEach(m => {
          if (m.userID == msg.author.id) {
            count += 1;
          }
        });
        if (count == 0) {
          var json = {
            userID: msg.author.id,
            lastSeen: 0,
            money: 0,
            inv: []
          };
          stuff.push(json);
          stuff = JSON.stringify(stuff);
          fs.writeFile('shop.json', stuff, 'utf8', function() { });
        }
      });
      setTimeout(function() {
        fs.readFile('shop.json', 'utf8', function readFileCallback(
          err,
          data
        ) {
          var stuff = JSON.parse(data);
          stuff.forEach(m => {
            if (m.userID == msg.author.id) {
              var index = stuff.findIndex(x => x.userID == m.userID);
              var amount = Math.floor(Math.random() * 65) + 1;
              stuff[index].money += amount;
              var currentMoney = stuff[index].money;
              stuff = JSON.stringify(stuff);
              fs.writeFile('shop.json', stuff, 'utf8', function() { });
              embed.setTitle('Regular Command');
              embed.setDescription(
                'You have successfully added £' +
                amount +
                ' to your balance! Your balance is now: `£' +
                currentMoney.toFixed(2) +
                '`'
              );
              msg.channel.send({ embed });
            }
          });
        });
      }, 50); /*
      embed.setTitle("Command Disabled");
      embed.setDescription("Sorry, this command is disabled at the moment for reason:\n`WIP`");
      msg.channel.send({embed});*/
    }
    if (msg.content.toLowerCase() == prefix + 'daily') {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      var numdate = dd + mm + yyyy;
      var fs = require('fs');
      fs.readFile('shop.json', 'utf8', function readFileCallback(err, data) {
        var count = 0;
        var stuff = JSON.parse(data);
        stuff.forEach(m => {
          if (m.userID == msg.author.id) {
            count += 1;
          }
        });
        if (count == 0) {
          var json = {
            userID: msg.author.id,
            lastSeen: 0,
            money: 0,
            inv: []
          };
          stuff.push(json);
          stuff = JSON.stringify(stuff);
          fs.writeFile('shop.json', stuff, 'utf8', function() { });
        }
      });
      setTimeout(function() {
        fs.readFile('shop.json', 'utf8', function readFileCallback(
          err,
          data
        ) {
          var stuff = JSON.parse(data);
          stuff.forEach(m => {
            if (m.userID == msg.author.id) {
              if (numdate > m.lastSeen) {
                var index = stuff.findIndex(x => x.userID == m.userID);
                stuff[index].lastSeen = numdate;
                stuff[index].money += 500;
                var currentMoney = stuff[index].money;
                stuff = JSON.stringify(stuff);
                fs.writeFile('shop.json', stuff, 'utf8', function() { });
                embed.setTitle('Daily Command');
                embed.setDescription(
                  'You have successfully added £500 to your balance! Your balance is now: `£' +
                  currentMoney.toFixed(2) +
                  '`'
                );
                msg.channel.send({ embed });
              } else {
                embed.setTitle('Daily Command');
                embed.setDescription(
                  'Sorry, You need to wait another day untill you can use this command again!'
                );
                msg.channel.send({ embed });
              }
            }
          });
        });
      }, 300);
    }
    if (msg.content.toLowerCase().startsWith(prefix + 'shop')) {
      var list = '';
      var shop = msg.content.toLowerCase().slice(6);
      if (shop == '') {
        embed.setTitle('List of Shops');
        embed.setDescription(
          `To look at a shop, type \`${prefix}shop\` followed by one of these:\n***food***\n***clothing***\n***other***`
        );
        msg.channel.send({ embed });
      } else {
        fs = require('fs');
        fs.readFile('shopInventory.json', 'utf8', function readFileCallback(
          err,
          data
        ) {
          stuff = JSON.parse(data);
          stuff.forEach(m => {
            if (m.category == shop) {
              list += m.name + ': `£' + m.price + '`\n';
            }
          });
        });
        setTimeout(function() {
          if (list == '') {
            embed.setTitle('Error');
            embed.setDescription(`${shop} is not a valid shop!`);
            msg.channel.send({ embed });
          } else {
            shop = shop.charAt(0).toUpperCase() + shop.slice(1);
            embed.setTitle(`${shop} Shop Stock`);
            embed.setDescription(
              list +
              `\n *remember you can use \`${prefix}buy [item]\` to purchase something*`
            );
            msg.channel.send({ embed });
          }
        }, 50);
      }
    }
    if (msg.content.toLowerCase().startsWith(prefix + 'buy')) {
      var item = msg.content.toLowerCase().slice(5);
      fs = require('fs');
      var money = 0;
      var isAble = true;
      fs.readFile('shop.json', 'utf8', function(err, data) {
        var count = 0;
        var stuff = JSON.parse(data);
        stuff.forEach(m => {
          if (m.userID == msg.author.id) {
            count += 1;
            money = m.money;
          }
        });
        if (count == 0) {
          isAble == false;
        }
      });
      setTimeout(function() {
        if (!isAble) {
          embed.setTitle('Error');
          embed.setDescription(
            'Sorry, you do not have the funds to purchase this item.'
          );
        } else {
          var price = 0;
          var id = 0;
          var canContinue = true;
          fs.readFile('shopInventory.json', 'utf8', function(err, data) {
            var stuff = JSON.parse(data);
            var count = 0;
            stuff.forEach(m => {
              if (m.name.toLowerCase() == item) {
                count += 1;
                price = m.price;
                id = m.id;
              }
            });
            setTimeout(function() {
              if (count == 0) {
                canContinue = false;
                embed.setTitle('Error');
                embed.setDescription(`No such item: ${item}`);
                msg.channel.send({ embed });
              }
            }, 10);
          });
          setTimeout(function() {
            if (canContinue) {
              if (price <= money) {
                fs.readFile('shop.json', 'utf8', function(err, data) {
                  var stuff = JSON.parse(data);
                  var index = stuff.findIndex(x => x.userID == msg.author.id);
                  var jsonStuff = {
                    userID: msg.author.id,
                    lastSeen: stuff[index].lastSeen,
                    money: (stuff[index].money -= price),
                    inv: stuff[index].inv
                  };
                  jsonStuff.inv.push(id);
                  stuff.splice(index, 1);
                  stuff.push(jsonStuff);
                  stuff = JSON.stringify(stuff);
                  fs.writeFile('shop.json', stuff, 'utf8', function() { });
                  embed.setTitle('Bought item');
                  embed.setDescription(`Successfully bought ${item}.`);
                  msg.channel.send({ embed });
                });
              } else {
                embed.setTitle('Error');
                embed.setDescription(
                  `Sorry, you do not have the funds to purchase this item.`
                );
                msg.channel.send({ embed });
              }
            }
          }, 50);
        }
      }, 50);
    }
  })
}