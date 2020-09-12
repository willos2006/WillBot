//require('dotenv').config(); 
const Discord = require('discord.js');
const bot = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const TOKEN = process.env.TOKEN;
const keepAlive = require('./server');
keepAlive()
bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  bot.user.setStatus('available')
  bot.user.setActivity('with the server!', {
    type: 'PLAYING'
  });
  var index = 0;
  setInterval(function() {
    if (index === 0) {
      bot.user.setActivity("out for -help", { type: "WATCHING" });
      index = 1;
    }
    else {
      index = 0;
      bot.user.setActivity("with the server!", { type: "PLAYING" });
    }
  }, 7000);
  //react to it's messages
  let guild = bot.guilds.cache.get('738107329643544587');
  let rolesChan = guild.channels.cache.find(channel => channel.id === "738110183389003818");
  rolesChan.messages.fetch('739234003357401118').then(m => {
    m.react('✅')
  });
  rolesChan.messages.fetch("739234078066475090").then(m => {
    m.react("1️⃣");
    m.react("2️⃣");
    m.react("3️⃣");
  });
  rolesChan.messages.fetch("739234797024706641").then(m => {
    m.react("🔴");
    m.react("🔵");
    m.react("🟢");
    m.react("🟠");
    m.react("🟣");
  });
  rolesChan.messages.fetch("739234158043201539").then(m => {
    m.react("👨");
    m.react("👩");
    m.react("⭕");
  });
  var numberOfUser;
  var numberOfOnline;
  let userOnline = guild.channels.cache.find(channel => channel.id === '739487262248796254');
  let userTot = guild.channels.cache.find(channel => channel.id === '739487343668363344');
  setInterval(async function() {
    guild.members.fetch();
    numberOfOnline = guild.members.cache.filter(member => member.presence.status == 'online').array().length;
    if (numberOfOnline != userOnline.name.slice(14)) {
      userOnline.edit({ name: "Online Users: " + numberOfOnline });
      console.log(`Online: ${numberOfOnline}`);
    }
  }, 1000);
  setInterval(async function() {
    guild.members.fetch();
    numberOfUser = guild.members.cache.array().length;
    if (numberOfUser != userTot.name.slice(13)) {
      userTot.edit({ name: "Users Total: " + numberOfUser });
      console.log(`Total: ${numberOfUser}`);
    }
  }, 1000);
});

var dares = [
  'Send a screenshot of your home screen',
  'Tell an embarrasing story',
  'Wear an outfit chosen be other players and send a picture',
  'Wear your clothes backwards',
  'Tell a dirty joke',
  'Eat something without using your hands',
  'Tell a funny joke',
  'Drink salt water',
  'Sent a screenshot of your browser history',
  'Wear your clothes inside out and send a picture',
  'Say something nice about the epic creator of this bot, <@303097521314725890> !',
  'Do twenty pushups',
  'Eat a slice of lemon',
  'Let a player pick a website for you to visit',
  'Draw a face on your stomach',
  'Give a tree a hug',
  'Tell everyone your strangest dream',
  'Video yourself recalling the alphabet backwards',
  'Send a selfie to the group',
  'Sing some Micheal Jackson',
  'Nominate someone else to do a dare',
  'What is the wierdest thing you have done with the opposite sex',
  'Message us a funny or spooky story... Your choice!!',
  'LEAVE THIS SPARE',
]

var truths = [
  'Who of all your family would you save if you could only save one?',
  'Do you love anyone (like a crush)',
  'Who do you like  (crush)',
  'Least favorite person in this server',
  'Most favorite person in this server',
  'Who do you hate most?',
  'How many discord servers are you in?',
  'Who was the last 5 people you dm’ed',
  'LEAVE SPARE'
]

var daresDone = [];
var truthsDone = [];

var currentDare;
var currentTuth;

var needDareReset = false;
var needTruthReset = false;

var chosen;

var currentNo = 0;

function chooseDare() {
  var conflict = 1;
  while (conflict > 0) {
    chosen = Math.floor(Math.random() * (dares.length - 1));
    var conflict = 0;
    if (daresDone.length == dares.length - 1) {
      needDareReset = true;
      break;
    }
    else {
      daresDone.forEach(function(i, index) {
        if (i == chosen) {
          conflict += 1;
        }
      });
    }
  }
}

function chooseTruth() {
  var conflict = 1;
  while (conflict > 0) {
    chosen = Math.floor(Math.random() * (truths.length - 1));
    var conflict = 0;
    if (truthsDone.length == truths.length - 1) {
      needTruthReset = true;
      break;
    }
    else {
      truthsDone.forEach(function(i, index) {
        if (i == chosen) {
          conflict += 1;
        }
      });
    }
  }
}

bot.on('guildMemberAdd', member => {
  member.guild.members.fetch();
  let welcomeChan = member.guild.channels.cache.find(channel => channel.id === '738107329643544590');
  welcomeChan.send("Yay! <@" + member.id + "> Is here! Make yourself comfortable and go on over to <#738110183389003818> to verify yourself!");
});

bot.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      console.log('Something went wrong when fetching the message: ', error);
      return;
    }
  }
  if (reaction.message)
    if (user.id != bot.user.id) {
      if (reaction.message.id === '739234003357401118' && !(reaction.message.guild.members.cache.find(member => member.id == user.id).roles.cache.find(role => role.name === "Verified"))) {
        reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "Verified"));
        user.send("You have been verified in my server! Please remember to be respectful and kind at all times! Other than that, do what you like!");
        reaction.message.reactions.resolve('✅').users.remove(user.id);
      }
      else if (reaction.message.id === '739234003357401118') {
        reaction.message.reactions.resolve('✅').users.remove(user.id);
      }
      if (reaction.message.channel.id == "749381667562455190") {
        fs = require('fs');
        fs.readFile('tickets.json', 'utf8', function readFileCallback(err, data) {
          stuff = JSON.parse(data);
          stuff.forEach(m => {
            if (m.msgID == reaction.message.id) {
              JSON.parse(data).forEach(m => {
                if (m.msgID == reaction.message.id) {
                  reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name == m.id));
                  reaction.message.guild.channels.cache.find(channel => channel.id == m.channelID).send("Staff <@!" + user.id + "> has joined");
                  reaction.message.delete();
                }
              });
            }
          });
        });
      }
      if (reaction.message.id === '739234078066475090') {
        let msg = await reaction.message.channel.messages.fetch('739234078066475090');
        if (reaction.message.guild.members.cache.find(member => member.id === user.id).roles.cache.find(role => role.name === "13-14")) {
          await reaction.message.guild.members.cache.find(member => member.id == user.id).roles.remove(reaction.message.guild.roles.cache.find(role => role.name === "13-14"));
        }
        if (reaction.message.guild.members.cache.find(member => member.id === user.id).roles.cache.find(role => role.name === "15-16")) {
          await reaction.message.guild.members.cache.find(member => member.id == user.id).roles.remove(reaction.message.guild.roles.cache.find(role => role.name === "15-16"));
        }
        if (reaction.message.guild.members.cache.find(member => member.id === user.id).roles.cache.find(role => role.name === "17-18")) {
          await reaction.message.guild.members.cache.find(member => member.id == user.id).roles.remove(reaction.message.guild.roles.cache.find(role => role.name === "17-18"));
        }
        if (reaction.emoji.name == '1️⃣' && reaction.message.id === '739234078066475090') {
          reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "13-14"));
          user.send("You have the `13-14` role!");
          reaction.message.reactions.resolve("1️⃣").users.remove(user.id);
        }
        if (reaction.emoji.name == '2️⃣' && reaction.message.id === '739234078066475090') {
          reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "15-16"));
          user.send("You have the `15-16` role!");
          reaction.message.reactions.resolve("2️⃣").users.remove(user.id);
        }
        if (reaction.emoji.name == '3️⃣' && reaction.message.id === '739234078066475090') {
          reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "17-18"));
          user.send("You have the `17-18` role!");
          reaction.message.reactions.resolve("3️⃣").users.remove(user.id);
        }
      }
      if (reaction.message.id === '739234797024706641') {
        let msg = await reaction.message.channel.messages.fetch('739234797024706641');
        if (reaction.message.guild.members.cache.find(member => member.id === user.id).roles.cache.find(role => role.name === "red")) {
          await reaction.message.guild.members.cache.find(member => member.id == user.id).roles.remove(reaction.message.guild.roles.cache.find(role => role.name === "red"));
        }
        if (reaction.message.guild.members.cache.find(member => member.id === user.id).roles.cache.find(role => role.name === "blue")) {
          await reaction.message.guild.members.cache.find(member => member.id == user.id).roles.remove(reaction.message.guild.roles.cache.find(role => role.name === "blue").id);
        }
        if (reaction.message.guild.members.cache.find(member => member.id === user.id).roles.cache.find(role => role.name === "green")) {
          await reaction.message.guild.members.cache.find(member => member.id == user.id).roles.remove(reaction.message.guild.roles.cache.find(role => role.name === "green").id);
        }
        if (reaction.message.guild.members.cache.find(member => member.id === user.id).roles.cache.find(role => role.name === "orange")) {
          await reaction.message.guild.members.cache.find(member => member.id == user.id).roles.remove(reaction.message.guild.roles.cache.find(role => role.name === "orange").id);
        }
        if (reaction.message.guild.members.cache.find(member => member.id === user.id).roles.cache.find(role => role.name === "purple")) {
          await reaction.message.guild.members.cache.find(member => member.id == user.id).roles.remove(reaction.message.guild.roles.cache.find(role => role.name === "purple").id);
        }
        if (reaction.emoji.name == '🔴') {
          await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "red"));
          user.send('You chose the color `red`');
          reaction.message.reactions.resolve("🔴").users.remove(user.id);
        }
        if (reaction.emoji.name == '🔵') {
          await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "blue"));
          user.send('You chose the color `blue`');
          reaction.message.reactions.resolve("🔵").users.remove(user.id);
        }
        if (reaction.emoji.name == '🟢') {
          await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "green"));
          user.send('You chose the color `green`');
          reaction.message.reactions.resolve("🟢").users.remove(user.id);
        }
        if (reaction.emoji.name == '🟠') {
          await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "orange"));
          user.send('You chose the color `orange`');
          reaction.message.reactions.resolve("🟠").users.remove(user.id);
        }
        if (reaction.emoji.name == '🟣') {
          await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "purple"));
          user.send('You chose the color `purple`');
          reaction.message.reactions.resolve("🟣").users.remove(user.id);
        }
      }
      if (reaction.message.id === "739234158043201539") {
        let msg = await reaction.message.channel.messages.fetch('739234158043201539');
        if (reaction.message.guild.members.cache.find(member => member.id === user.id).roles.cache.find(role => role.name === "Male")) {
          await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.remove(reaction.message.guild.roles.cache.find(role => role.name === "Male").id);
        }
        if (reaction.message.guild.members.cache.find(member => member.id === user.id).roles.cache.find(role => role.name === "Female")) {
          await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.remove(reaction.message.guild.roles.cache.find(role => role.name === "Female").id);
        }
        if (reaction.message.guild.members.cache.find(member => member.id === user.id).roles.cache.find(role => role.name === "Other")) {
          await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.remove(reaction.message.guild.roles.cache.find(role => role.name === "Other").id);
        }
        if (reaction.emoji.name == '👨') {
          await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "Male"));
          user.send("You chose the `Male` role");
          reaction.message.reactions.resolve('👨').users.remove(user.id);
        }
        if (reaction.emoji.name == '👩') {
          await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "Female"));
          user.send("You chose the `Female` role");
          reaction.message.reactions.resolve('👩').users.remove(user.id);
        }
        if (reaction.emoji.name == '⭕') {
          await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "Other"));
          user.send("You chose the `Other` role");
          reaction.message.reactions.resolve('⭕').users.remove(user.id);
        }
      }
    }
});

bot.on('message', msg => {
  if (msg.author.id != bot.user.id) {
    var embed = new Discord.MessageEmbed().setTitle("WillBot").setColor(0x0046ff);
    if (msg.content === '-troubleshoot members') {
      msg.guild.members.cache.forEach(member => console.log(member.user.username));
    }
    if (msg.content.startsWith('-openTicket') && msg.channel.id == '748990835844055112') {
      var reason = msg.content.slice(12);
      var user = msg.author.id;
      var id = Math.floor(Math.random() * 100000) + 1;
      msg.guild.roles.create({ data: { name: id } });
      channelID = 0;
      msgID = 0;
      setTimeout(function() {
        var topRole = msg.guild.roles.cache.size;
        msg.guild.roles.cache.find(role => role.name == `${id}`).setPosition(topRole - 2).then().catch(error => { console.log(error) });
        msg.guild.members.cache.find(member => member.id == msg.author.id).roles.add(msg.guild.roles.cache.find(role => role.name == `${id}`));
        msg.guild.channels.create("Ticket no: " + id, {
          permissionOverwrites: [{
            id: msg.guild.roles.cache.find(role => role.name == `${id}`),
            allow: ['VIEW_CHANNEL']
          },
          {
            id: msg.guild.roles.everyone.id,
            deny: ['VIEW_CHANNEL']
          },
          {
            id: msg.guild.roles.cache.find(role => role.name == "Admins"),
            deny: ['VIEW_CHANNEL']
          }
          ]
        }).then(c => {
          channelID = c.id;
        });
        var ticketReq = msg.guild.channels.cache.find(channel => channel.id == "749381667562455190");
        embed.setDescription(`User: <@!${msg.author.id}> has just opened a support ticket for reason: ***${reason}***. Please react to this message to accept it!`);
        ticketReq.send({ embed }).then(m => {
          msgID = m.id;
          m.react("✅");
        });
      }, 500);
      setTimeout(function() {
        msg.guild.channels.cache.find(channel => channel.id == channelID).send("Thanks for opening a support ticket with us... Please wait patiently while a staff member accepts your request.");
        var data1 = {
          "username": user,
          "reason": reason,
          "id": id,
          "channelID": channelID,
          "msgID": msgID
        }
        var fs = require('fs');
        fs.readFile('tickets.json', 'utf8', function readFileCallback(err, data) {
          obj = JSON.parse(data);
          obj.push(data1);
          json = JSON.stringify(obj);
          fs.writeFile('tickets.json', json, 'utf8', function() { });
        });
        msg.delete();
        embed.setDescription("Opened ticket! Please wait patiently...");
        msg.channel.send({ embed }).then(m => {
          setTimeout(function() {
            m.delete();
          }, 1500);
        });
      }, 1000);
    }
    if (msg.content == "-closeTicket") {
      var fs = require('fs');
      fs.readFile('tickets.json', 'utf8', function readFileCallback(err, data) {
        var stuff = JSON.parse(data);
        stuff.forEach(m => {
          if (m.channelID == msg.channel.id) {
            var index = stuff.findIndex(x => x.channelID == msg.channel.id);
            stuff.splice(index, 1);
            stuff = JSON.stringify(stuff);
            fs.writeFile('tickets.json', stuff, 'utf8', function() { });
            msg.channel.delete();
            msg.channel.guild.roles.cache.find(role => role.name == m.id).delete();
          }
        });
      });
    }
    if (msg.content == '-deleteTicketRoles') {
      msg.guild.roles.cache.forEach(r => {
        if (!isNaN(r.name)) {
          r.delete();
        }
      })
    }
    if (msg.content === '-truth' && msg.channel.id === '738109060640931952') {
      if (needTruthReset) {
        embed.setDescription("You have gone through them all! Please use the `-resetTruth` command to start over, or just do some dares!");
        msg.channel.send({ embed });
      }
      else {
        if (truthsDone.length == truths.length - 1) {
          embed.setDescription("You have gone through them all! Please use the `-resetTruth` command to start over, or just do some dares!");
          msg.channel.send({ embed });
          needTruthReset = true;
        }
        else {
          msg.channel.send('thinking of truth...');
          chooseTruth();
          msg.reply(truths[chosen]);
          truthsDone.push(chosen);
        }
      }
    }
    else if (msg.content === '-truth') {
      embed.setDescription("You can only use me in the truth or dare channel!");
    }

    if (msg.content === '-dare' && msg.channel.id === '738109060640931952') {
      if (needDareReset) {
        embed.setDescription("You have gone through them all! Please use the `-resetDare` command to start over, or just do some truths!");
        msg.channel.send({ embed });
      }
      else {
        if (daresDone.length == dares.length - 1) {
          embed.setDescription("You have gone through them all! Please use the `-resetDare` command to start over, or just do some truths!");
          needDareReset = true;
          msg.channel.send({ embed });
        }
        else {
          msg.channel.send('thinking of dare...');
          chooseDare();
          msg.reply('I dare you to... ' + dares[chosen]);
          daresDone.push(chosen);
        }
      }
    }
    else if (msg.content === '-dare') {
      embed.setDescription("You can only use me in the truth or dare channel!");
      msg.channel.send({ embed });
    }
    if (msg.content.toLowerCase() == 'ping') {
      msg.channel.send("Pong! I'm alive! Check out my status here: https://stats.uptimerobot.com/pXEYlIzpJJ");
    }
    if (msg.content === '-resetDare' && msg.channel.id === '738109060640931952') {
      embed.setDescription('Reset Dares!');
      daresDone = [];
      needDareReset = false;
      msg.channel.send({ embed });
    }
    else if (msg.content === '-resetDare') {
      embed.setDescription("You can only use me in the truth or dare channel!");
      msg.channel.send({ embed });
    }
    if (msg.content === '-resetTruth' && msg.channel.id === '738109060640931952') {
      embed.setDescription('Reset Truths!');
      truthsDone = [];
      needTruthReset = false;
      msg.channel.send({ embed });
    }
    else if (msg.content === '-resetTruth') {
      embed.setDescription("You can only use me in the truth or dare channel!");
      msg.channel.send({ embed });
    }
    if (msg.content.toLowerCase().startsWith("hey bot")) {
      msg.reply('hey!');
    }
    if (msg.content === 'shutdown') {
      bot.destroy();
    }
    if (msg.content === '-help') {
      embed.setDescription("Hey! Heres a list of commands:\n `-truth` \n `-dare` \n `-resetTruth` \n `-resetDare` \n `Hey Bot!` \n `-nickname [your new nickname]` just `-nickname` will reset your nickname \n `-dice [Number of dice to roll](not required)` \n `-say [message]` \n `-sayEmbed [message]` \n*ADMIN COMMANDS* \n `-delete [numberOfMessages](not required)` \n `-kick [user]` \n `-ban [user]` \n `-unban [user]` \n `-giveRole [user] [role]` \n `-removeRole [user] [role]`");
      msg.channel.send({ embed });
    }
    if (msg.channel.id === '738109254036226228') {
      if (!isNaN(msg.content)) {
        if (msg.content == currentNo + 1) {
          msg.react('✅');
          currentNo += 1;
        }
        else {
          msg.react('❌');
          currentNo = 0;
          embed.setDescription("<@" + msg.author.id + ">  has ruined it! The current number has been reset... start again from 1!");
          msg.channel.send({ embed });
        }
      }
    }
    if (msg.content.startsWith('-nickname')) {
      let nickname = msg.content.slice(10);
      msg.member.setNickname(nickname);
    }
    if (msg.content.startsWith('-dice')) {
      let number = msg.content.slice(6);
      result = '';
      if (number === '' || number == '1') {
        embed.setDescription('You rolled a... ' + (Math.floor(Math.random() * Math.floor(6)) + 1) + "!");
      }
      else {
        if (isNaN(number)) {
          embed.setDescription("Invalid Input");
        }
        else if (number <= 600) {
          var total = 0;
          number = parseInt(number, 10);
          result += (Math.floor(Math.random() * Math.floor(6)) + 1);
          total += parseInt(result, 10);
          if (number > 2) {
            for (i = 0; i < number - 2; i++) {
              var current = (Math.floor(Math.random() * Math.floor(6)) + 1);
              result += ", " + current;
              total += parseInt(current, 10);
            }
          }
          var current = (Math.floor(Math.random() * Math.floor(6)) + 1);
          result += " and a " + current;
          total += current;
          embed.setDescription("You rolled a " + result + " for a total of " + total + "!");
        }
        else {
          embed.setDescription("Please pick a value equal to or below 600!");
        }
      }
      msg.channel.send({ embed });
    }
    if (msg.content.startsWith("-sayEmbed")) {
      var content = msg.content.slice(10);
      embed.setDescription(content);
      msg.channel.send({ embed });
      msg.delete();
    }
    else if (msg.content.startsWith("-say")) {
      var content = msg.content.slice(5);
      msg.channel.send(content);
      msg.delete();
    }
    if (msg.content.toLowerCase() == '-daily') {
      /*var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      var numdate = dd + mm + yyyy;
      var fs = require('fs');
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
            "userID": msg.author.id,
            "lastSeen": 0,
            "money": 0
          }
          stuff.push(json);
          stuff = JSON.stringify(stuff);
          fs.writeFile('shop.json', stuff, 'utf8', function() { });
        }
      });
      setTimeout(function() {
        fs.readFile('shop.json', 'utf8', function readFileCallback(err, data) {
          var stuff = JSON.parse(data);
          stuff.forEach(m => {
            if (m.userID == msg.author.id) {
              if (numdate > m.lastSeen) {
                var index = stuff.findIndex(x => x.userID == m.userID);
                currentMoney = stuff[index].money;
                stuff.splice(index, 1);
                var json = {
                  "userID": m.userID,
                  "lastSeen": numdate,
                  "money": currentMoney + 500
                };
                currentMoney += 500;
                stuff.push(json);
                stuff = JSON.stringify(stuff);
                fs.writeFile('shop.json', stuff, 'utf8', function() { });
                embed.setTitle("Daily Command");
                embed.setDescription("You have successfully added £500 to your balance! Your balance is now: `£" + currentMoney + "`");
                msg.channel.send({ embed });
              }
              else{
                embed.setTitle("Daily Command");
                embed.setDescription("Sorry, You need to wait another day untill you can use this command again!");
                msg.channel.send({embed});
              }
            }
          });
        });
      }, 300);*/
      embed.setTitle("Command Disabled");
      embed.setDescription("Sorry, this command is disabled at the moment for reason:\n`WIP`");
      msg.channel.send({embed});
    }
    if(msg.content.toLowerCase() == '-wallet'){
      /*fs = require('fs');
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
            "userID": msg.author.id,
            "lastSeen": 0,
            "money": 0
          }
          stuff.push(json);
          stuff = JSON.stringify(stuff);
          fs.writeFile('shop.json', stuff, 'utf8', function() { });
        }
      });
      setTimeout(function(){
        fs.readFile('shop.json', 'utf8', function readFileCallback(err, data) {
          stuff = JSON.parse(data);
          stuff.forEach(m => {
            if(m.userID == msg.author.id){
              embed.setTitle("Wallet Balance");
              embed.setDescription("Your current balance is: `£" + m.money + "`");
              msg.channel.send({embed});
            }
          });
        });
      }, 300)*/
      embed.setTitle("Command Disabled");
      embed.setDescription("Sorry, this command is disabled at the moment for reason:\n`WIP`");
      msg.channel.send({embed});
    }
    if (msg.content.toLowerCase() == '-regular') {
      /*var fs = require('fs');
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
            "userID": msg.author.id,
            "lastSeen": 0,
            "money": 0
          }
          stuff.push(json);
          stuff = JSON.stringify(stuff);
          fs.writeFile('shop.json', stuff, 'utf8', function() { });
        }
      });
      setTimeout(function() {
        fs.readFile('shop.json', 'utf8', function readFileCallback(err, data) {
          var stuff = JSON.parse(data);
          stuff.forEach(m => {
            if (m.userID == msg.author.id) {
              var index = stuff.findIndex(x => x.userID == m.userID);
              currentMoney = stuff[index].money;
              stuff.splice(index, 1);
              var json = {
                "userID": m.userID,
                "lastSeen": m.lastSeen,
                "money": currentMoney + 100
              };
              currentMoney += 100;
              stuff.push(json);
              stuff = JSON.stringify(stuff);
              fs.writeFile('shop.json', stuff, 'utf8', function() { });
              embed.setTitle("Regular Command");
              embed.setDescription("You have successfully added £100 to your balance! Your balance is now: `£" + currentMoney + "`");
              msg.channel.send({ embed });
            }
          });
        });
      }, 50);*/
      embed.setTitle("Command Disabled");
      embed.setDescription("Sorry, this command is disabled at the moment for reason:\n`WIP`");
      msg.channel.send({embed});
    }
    //admin commands
    if (msg.content.startsWith('-delete') && msg.member.roles.cache.find(role => role.name === 'Admins')) {
      let amount = msg.content.slice(8);
      if (isNaN(amount) && amount != '') {
        embed.setDescription("Please enter a valid number");
      }
      else if (amount == '') {
        msg.channel.messages.fetch({ limit: 2 }).then(messages => {
          msg.channel.bulkDelete(messages);
        });
      }
      else {
        amount = parseInt(amount, 10);
        if (amount >= 99) {
          msg.channel.messages.fetch({ limit: 100 }).then(messages => {
            msg.channel.bulkDelete(messages);
          });
        }
        else {
          msg.channel.messages.fetch({ limit: amount + 1 }).then(messages => {
            msg.channel.bulkDelete(messages);
          });
        }
      }
    }
    else if (msg.content.startsWith('-delete')) {
      embed.setDescription("You must have the `Admins` role to use this command");
      msg.channel.send({ embed });
    }
    if (msg.content.startsWith('-kick') && msg.member.roles.cache.find(role => role.name === 'Admins')) {
      let userToKick = msg.content.slice(6);
      userToKick = userToKick.replace(/[\\<>@#&!]/g, "");
      try {
        msg.guild.members.cache.find(member => member.id === userToKick).kick();
        msg.delete();
      }
      catch{
        embed.setDescription("Invalid User");
      }
    }
    else if (msg.content.startsWith('-kick')) {
      embed.setDescription("You must have the `Admins` role to use this command")
    }
    if (msg.content.startsWith('-ban') && msg.member.roles.cache.find(role => role.name === 'Admins')) {
      let userToKick = msg.content.slice(5);
      userToKick = userToKick.replace(/[\\<>@#&!]/g, "");
      try {
        msg.guild.members.cache.find(member => member.id === userToKick).ban();
        msg.delete();
      }
      catch{
        embed.setDescription("Invalid User");
      }
      msg.channel.send({ embed });
    }
    else if (msg.content.startsWith('-ban')) {
      embed.setDescription("You must have the `Admins` role to use this command");
      msg.channel.send({ embed });
    }
    if (msg.content.startsWith('-unban') && msg.member.roles.cache.find(role => role.name === 'Admins')) {
      let userToKick = msg.content.slice(8);
      userToKick = userToKick.replace(/[\\<>@#&!]/g, "");
      try {
        msg.guild.members.unban(userToKick);
        msg.delete();
      }
      catch{
        embed.setDescription("Invalid User");
      }
      msg.channel.send({ embed });
    }
    else if (msg.content.startsWith('-unban')) {
      embed.setDescription("You must have the `Admins` role to use this command");
      msg.channel.send({ embed });
    }
    if (msg.content.startsWith('-giveRole') && msg.member.roles.cache.find(role => role.name === 'Admins')) {
      let usertoRole = msg.content.slice(10, 31);
      usertoRole = usertoRole.replace(/[\\<>@#&!]/g, "");
      if (usertoRole.length == 17) {
        usertoRole = usertoRole.substring(0, 17);
      }
      let roletogive = msg.content.slice(33);
      roletogive = roletogive.replace(/[\\<>@#&!]/g, "");
      try {
        if (msg.guild.roles.cache.find(role => role.id === roletogive)) {
          msg.guild.members.cache.find(member => member.id === usertoRole).roles.add(msg.guild.roles.cache.find(role => role.id === roletogive));
          embed.setDescription('successfully gave role <@&' + msg.guild.roles.cache.find(role => role.id === roletogive).id + '> to <@' + msg.guild.members.cache.find(member => member.id === usertoRole).id + '>');
        }
        else if (msg.guild.members.cache.find(member => member.id === usertoRole)) {
          embed.setDescription("No such role exists!");
        }
        else {
          embed.setDescription("No such user exists!");
        }
      }
      catch{
        embed.setDescription('Invalid Input');
      }
      msg.channel.send({ embed });
    }
    else if (msg.content.startsWith('-giveRole')) {
      embed.setDescription("You must have the `Admins` role to use this command!");
      msg.channel.send({ embed });
    }
    if (msg.content.startsWith('-removeRole') && msg.member.roles.cache.find(role => role.name === 'Admins')) {
      let usertoRole = msg.content.slice(12, 33);
      usertoRole = usertoRole.replace(/[\\<>@#&!]/g, "");
      if (usertoRole.length == 17) {
        usertoRole = usertoRole.substring(0, 17);
      }
      let roletogive = msg.content.slice(35);
      roletogive = roletogive.replace(/[\\<>@#&!]/g, "");
      try {
        if (msg.guild.members.cache.find(member => member.id === usertoRole).roles.cache.find(role => role.id === roletogive)) {
          msg.guild.members.cache.find(member => member.id === usertoRole).roles.remove(msg.guild.roles.cache.find(role => role.id === roletogive));
          embed.setDescription('successfully removed role <@&' + msg.guild.roles.cache.find(role => role.id === roletogive).id + '> from <@' + msg.guild.members.cache.find(member => member.id === usertoRole).id + '>');
        }
        else if (isNaN(usertoRole)) {
          embed.setDescription("No such user exists!");
        }
        else if (!(msg.guild.roles.cache.find(role => role.id === roletogive))) {
          embed.setDescription("No such role exists!");
        }
        else if (!(msg.guild.members.cache.find(member => member.id === usertoRole).roles.cache.find(role => role.id === roletogive))) {
          embed.setDescription("The user does not have the specified role!");
        }
        else {
          embed.setDescription("There was an undetectable error with your command... Please DM <@303097521314725890> so he can quickly recitfy the problem!");
        }
      }
      catch{
        if (isNaN(usertoRole)) {
          embed.setDescription("No such user exists!");
        }
        else if (!(msg.guild.roles.cache.find(role => role.id === roletogive))) {
          embed.setDescription("No such role exists!");
        }
        else {
          embed.setDescription("The user does not have the specified role!");
        }
      }
      msg.channel.send({ embed });
    }
    else if (msg.content.startsWith('-removeRole')) {
      embed.setDescription("You must have the `Admins` role to use this command!");
      msg.channel.send({ embed });
    }
  }
});                 