module.exports = async (client, configFile) => {
  const Discord = require('discord.js');
  const embed = new Discord.MessageEmbed();
  var fs = require('fs');
  const settings = require('../settings/settings.json');
  var prefix = settings.prefix;
  prefix = settings.prefix;

  var sureSellAll = { tag: 0, isReady: false };
  var buyConfirm = { tag: 0, isReady: false, itemName: "", itemID: 0, price: 0, category: "" };

  client.on('message', async msg => {
    embed.setFooter(msg.author.tag)
    embed.setColor(0x0046ff);
    if (msg.content.toLowerCase().startsWith(prefix + 'sellall') && settings.economyCommandsEnabled == true) {
      var totalAssets = 0;
      var fs = require('fs');
      fs.readFile('shop.json', 'utf8', function readFileCallback(err, data) {
        stuff = JSON.parse(data);
        var items =
          stuff[stuff.findIndex(x => x.userID == msg.author.id)].inv;
        fs.readFile('shopInventory.json', 'utf8', function (err, data) {
          var stuffInv = JSON.parse(data);
          items.forEach(m => {
            var index = stuffInv.findIndex(x => x.id == m);
            totalAssets += stuffInv[index].sellPrice;
          });
        });
      });
      setTimeout(function () {
        embed.setTitle('Confirm');
        embed.setDescription(
          'Are you sure you want to sell all your items? You would get a total of `£' +
          totalAssets.toFixed(2) +
          '` for everything.\nType `y/n` to confirm or cancel'
        );
        sureSellAll = { tag: msg.author.id, isReady: true };
        msg.channel.send({ embed });
      }, 10);
    }
    else if (msg.content.toLowerCase().startsWith(prefix + 'sellall')) {
      embed.setTitle("Economy Commands Disabled");
      embed.setDescription("Sorry, but economy commands are currently disabled...");
      msg.channel.send({ embed });
    }
    if (sureSellAll.isReady && msg.author.id == sureSellAll.tag && settings.economyCommandsEnabled == true) {
      var fs = require('fs');
      if (msg.content.toLowerCase() == 'y') {
        var totalAssets = 0;
        fs.readFile('shop.json', 'utf8', function readFileCallback(
          err,
          data
        ) {
          stuff = JSON.parse(data);
          var items =
            stuff[stuff.findIndex(x => x.userID == msg.author.id)].inv;
          fs.readFile('shopInventory.json', 'utf8', function (err, data) {
            var stuffInv = JSON.parse(data);
            items.forEach(m => {
              var index = stuffInv.findIndex(x => x.id == m);
              totalAssets += stuffInv[index].sellPrice;
            });
          });
          setTimeout(function () {
            stuff[stuff.findIndex(x => x.userID == msg.author.id)].inv = [];
            stuff[
              stuff.findIndex(x => x.userID == msg.author.id)
            ].money += totalAssets;
            stuff[stuff.findIndex(x => x.userID == msg.author.id)
            ].statement.push({
              itemName: "All Items Sold",
              itemPrice: totalAssets,
              date: date,
              time: time
            });
            fs.writeFile(
              'shop.json',
              JSON.stringify(stuff),
              'utf8',
              function () { }
            );
          }, 50);
          embed.setTitle('Success');
          embed.setDescription('Succesfully sold all your assets');
          msg.channel.send({ embed });
        });
      } else if (msg.content.toLowerCase() == 'n') {
        embed.setTitle('Canceled');
        embed.setDescription('Canceled operation');
        msg.channel.send({ embed });
      }
      sureSellAll = false;
    }
    if (msg.content.toLowerCase() == prefix + 'wallet' && settings.economyCommandsEnabled == true) {
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
            inv: [],
            statement: []
          };
          stuff.push(json);
          stuff = JSON.stringify(stuff);
          fs.writeFile('shop.json', stuff, 'utf8', function () { });
        }
      });
      setTimeout(function () {
        fs.readFile('shop.json', 'utf8', function readFileCallback(
          err,
          data
        ) {
          stuff = JSON.parse(data);
          var items =
            stuff[stuff.findIndex(x => x.userID == msg.author.id)].inv;
          var totalAssets = 0;
          fs.readFile('shopInventory.json', 'utf8', function (err, data) {
            var stuffInv = JSON.parse(data);
            items.forEach(m => {
              var index = stuffInv.findIndex(x => x.id == m);
              totalAssets += stuffInv[index].sellPrice;
            });
          });
          setTimeout(function () {
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
    else if (msg.content.toLowerCase().startsWith(prefix + 'wallet')) {
      embed.setTitle("Economy Commands Disabled");
      embed.setDescription("Sorry, but economy commands are currently disabled...");
      msg.channel.send({ embed });
    }
    if (msg.content.toLowerCase() == prefix + 'regular' && settings.economyCommandsEnabled == true) {
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
            inv: [],
            statement: []
          };
          stuff.push(json);
          stuff = JSON.stringify(stuff);
          fs.writeFile('shop.json', stuff, 'utf8', function () { });
        }
      });
      setTimeout(function () {
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
              fs.writeFile('shop.json', stuff, 'utf8', function () { });
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
    else if (msg.content.toLowerCase().startsWith(prefix + 'regular')) {
      embed.setTitle("Economy Commands Disabled");
      embed.setDescription("Sorry, but economy commands are currently disabled...");
      msg.channel.send({ embed });
    }
    if (msg.content.toLowerCase() == prefix + 'daily' && settings.economyCommandsEnabled == true) {
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
            inv: [],
            statement: []
          };
          stuff.push(json);
          stuff = JSON.stringify(stuff);
          fs.writeFile('shop.json', stuff, 'utf8', function () { });
        }
      });
      setTimeout(function () {
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
                fs.writeFile('shop.json', stuff, 'utf8', function () { });
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
    else if (msg.content.toLowerCase().startsWith(prefix + 'daily')) {
      embed.setTitle("Economy Commands Disabled");
      embed.setDescription("Sorry, but economy commands are currently disabled...");
      msg.channel.send({ embed });
    }
    if (msg.content.toLowerCase().startsWith(prefix + 'shop') && settings.economyCommandsEnabled == true) {
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
        setTimeout(function () {
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
    else if (msg.content.toLowerCase().startsWith(prefix + 'shop')) {
      embed.setTitle("Economy Commands Disabled");
      embed.setDescription("Sorry, but economy commands are currently disabled...");
      msg.channel.send({ embed });
    }
    if (msg.content.toLowerCase().startsWith(prefix + 'buy') && settings.economyCommandsEnabled == true && buyConfirm.isReady == false) {
      var item = msg.content.toLowerCase().slice(5);
      fs = require('fs');
      var money = 0;
      var isAble = true;
      fs.readFile('shop.json', 'utf8', function (err, data) {
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
      setTimeout(function () {
        if (!isAble) {
          embed.setTitle('Error');
          embed.setDescription(
            'Sorry, you do not have the funds to purchase this item.'
          );
        } else {
          var price = 0;
          var id = 0;
          var canContinue = true;
          fs.readFile('shopInventory.json', 'utf8', function (err, data) {
            var stuff = JSON.parse(data);
            var count = 0;
            stuff.forEach(m => {
              if (m.name.toLowerCase() == item) {
                count += 1;
                price = m.price;
                id = m.id;
              }
            });
            setTimeout(function () {
              if (count == 0) {
                canContinue = false;
                embed.setTitle('Error');
                embed.setDescription(`No such item: ${item}`);
                msg.channel.send({ embed });
              }
            }, 10);
          });
          setTimeout(async function () {
            if (canContinue) {
              if (price <= money) {
                var shop;
                await fs.readFile('shopInventory.json', 'utf8', function (err, data) {
                  data = JSON.parse(data);
                  var index = data.findIndex(x => x.name.toLowerCase() == item);
                  shop = data[index].category;
                });
                buyConfirm.tag = msg.author.id;
                buyConfirm.isReady = true;
                buyConfirm.itemName = item;
                buyConfirm.itemID = id;
                buyConfirm.category = shop;
                buyConfirm.price = price;
                embed.setTitle("Confirm Purchase");
                embed.setDescription("Please confirm your purchase with y/n. If you have a coupon code, please enter it below instead of y or n.");
                msg.channel.send({ embed });
              }
            }
          }, 50);
        }
      }, 50);
    }
    else if (msg.content.toLowerCase().startsWith(prefix + 'buy') && buyConfirm.isReady == false) {
      embed.setTitle("Economy Commands Disabled");
      embed.setDescription("Sorry, but economy commands are currently disabled...");
      msg.channel.send({ embed });
    }
    if (buyConfirm.isReady == true && msg.author.id == buyConfirm.tag) {
      var fs = require('fs');
      var response = msg.content.toLowerCase();
      var id = buyConfirm.itemID;
      var item = buyConfirm.itemName;
      var price = buyConfirm.price;
      var cat = buyConfirm.category;
      var discount = 0;
      var error = 0;
      if (response == 'y') {
        fs.readFile('shop.json', 'utf8', function (err, data) {
          var stuff = JSON.parse(data);
          var index = stuff.findIndex(x => x.userID == msg.author.id);
          var stuff = JSON.parse(data);
          var index = stuff.findIndex(x => x.userID == msg.author.id);
          var jsonStuff = {
            userID: msg.author.id,
            lastSeen: stuff[index].lastSeen,
            money: stuff[index].money -= (price * (1 - (discount / 100))),
            inv: stuff[index].inv,
            statement: []
          };
          var currentDate = new Date();
          var date = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();
          var time = currentDate.getHours() + ":" + currentDate.getMinutes();
          stuff.splice(index, 1);
          jsonStuff.statement.push({
            itemName: item,
            itemPrice: -1 * (price * (1 - (discount / 100))),
            date: date,
            time: time
          })
          stuff.splice(index, 1);
          stuff.push(jsonStuff);
          stuff = JSON.stringify(stuff);
          fs.writeFile('shop.json', stuff, 'utf8', function () { });
          embed.setTitle('Bought item');
          embed.setDescription(`Successfully bought ${item}.`);
          msg.channel.send({ embed });
        });
      }
      else if (response == 'n') {
        embed.setTitle("Canceled");
        embed.setDescription("Purchase Canceled! No charge has been applied to your account.");
        msg.channel.send({ embed });
      }
      else {
        await fs.readFile('discountCodes.json', 'utf8', async function (err, data) {
          var data = JSON.parse(data);
          data.forEach(m => {
            if (m.code != response) {
              error += 1;
            }
            else {
              discount = m.percent;
              if (eval(m.param)(item, cat, price, msg.author.id) != true) {
                error += 1;
              }
            }
          });
        });
        setTimeout(function () {
          if (error == 0) {
            fs.readFile('shop.json', 'utf8', function (err, data) {
              var stuff = JSON.parse(data);
              var index = stuff.findIndex(x => x.userID == msg.author.id);
              var jsonStuff = {
                userID: msg.author.id,
                lastSeen: stuff[index].lastSeen,
                money: stuff[index].money -= (price * (1 - (discount / 100))),
                inv: stuff[index].inv,
                statement: []
              };
              var currentDate = new Date();
              var date = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();
              var time = currentDate.getHours() + ":" + currentDate.getMinutes();
              stuff.splice(index, 1);
              jsonStuff.statement.push({
                itemName: item,
                itemPrice: -1 * (price * (1 - (discount / 100))),
                date: date,
                time: time
              })
              jsonStuff.inv.push(id);
              stuff.push(jsonStuff);
              stuff = JSON.stringify(stuff);
              fs.writeFile('shop.json', stuff, 'utf8', function () { });
              msg.delete();
              msg.channel.send("***Code Hidden***")
              embed.setTitle('Bought item');
              embed.setDescription(`Successfully bought ${item} with ${discount}% off using a discount code! (£${(price * (1 - (discount / 100))).toFixed(2)} final price)`);
              msg.channel.send({ embed });
            });
          }
          else {
            embed.setTitle("Invalid Code");
            embed.setDescription("Sorry, the code you provided was either invalid, or is not applicible in this situation.");
            msg.channel.send({ embed });
          }
        }, 50)
      }
      buyConfirm.tag = ""; buyConfirm.isReady = false;
    }
  })
}