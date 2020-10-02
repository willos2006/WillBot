//require('dotenv').config();
'use strict';
const Discord = require('discord.js');
const bot = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
const configFile = require('./settings/config.json');
const settingFile = require('./settings/settings.json')
var prefix = settingFile.prefix
var stuff;
var json;
bot.login(process.env.TOKEN);
module.exports.data = function(callback) {
  var stuff;
var json;
  var totalNum = bot.guilds.cache
    .get('738107329643544587')
    .members.cache.array().length;
  var totalOnlineNum = bot.guilds.cache
    .get('738107329643544587')
    .members.cache.filter(member => member.presence.status != 'offline')
    .array().length;
  var totalBotMoney = 0;
  var fs = require('fs');
  fs.readFile('shop.json', 'utf8', function(err, data) {
    data = JSON.parse(data);
    data.forEach(m => {
      totalBotMoney += m.money;
    });
  });
  setTimeout(function() {
    var jsonArr = {
      tot: totalNum,
      totOn: totalOnlineNum,
      totMon: '£' + totalBotMoney.toFixed(2)
    };
    callback(jsonArr);
  }, 30);
};

var stuff;

module.exports.contact = function(contactform) {
  var fname = contactform.fname;
  var lname = contactform.lname;
  var discordname = contactform.discordname;
  var subject = contactform.subject;
  var body = contactform.body;
  var embed = new Discord.MessageEmbed()
    .setTitle('Contact Form Submition')
    .setColor(0x0046ff);
  embed.setDescription(
    `***First Name:*** ${fname}\n***Last Name:*** ${lname}\n***Discord Tag:*** ${discordname}\n***Subject:*** ${subject}\n***Message Body:*** ${body}`
  );
  bot.guilds.cache
    .get('738107329643544587')
    .channels.cache.find(channel => channel.id == '759804392970518579')
    .send({ embed });
};
var embed = new Discord.MessageEmbed()

const keepAlive = require('./server');
keepAlive();
var data = [];

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  bot.user.setStatus('available');
  bot.user.setActivity('with the server!', {
    type: 'PLAYING'
  });
  var index = 0;
  setInterval(function() {
    if (index === 0) {
      bot.user.setActivity(`out for ${prefix}help`, { type: 'WATCHING' });
      index = 1;
    } else {
      index = 0;
      bot.user.setActivity('with the server!', { type: 'PLAYING' });
    }
  }, 7000);

  var eventFunction = require('./serverEvents/reactionRoles.js');
  eventFunction(bot, configFile)

  eventFunction = require('./serverEvents/serverStats.js');
  eventFunction(bot, configFile)

  eventFunction = require('./commands/truthDare.js');
  eventFunction(bot, configFile)

  eventFunction = require('./commands/tickets.js');
  eventFunction(bot, configFile)

  eventFunction = require('./commands/role.js');
  eventFunction(bot, configFile)

  eventFunction = require('./commands/botdm.js');
  eventFunction(bot, configFile)

  eventFunction = require('./commands/economy.js');
  eventFunction(bot, configFile)

  eventFunction = require('./commands/nickname.js');
  eventFunction(bot, configFile)
});

bot.on('guildMemberAdd', member => {
  member.guild.members.fetch();
  let welcomeChan = member.guild.channels.cache.find(
    channel => channel.id === configFile.welcomeChannel
  );
  welcomeChan.send(
    'Yay! <@' + member.id + `> Is here! Make yourself comfortable and go on over to <#${configFile.welcomeChannel}> to verify yourself!`
  );
});

var sureSellAll = { tag: 0, isReady: false };

var fs;

embed.setTitle("WillBot")
embed.setColor('#0099ff')

/*bot.on('message', async msg => {
  embed.setFooter(msg.author.tag)
  if (msg.content.toLowerCase() === prefix + 'truth' && msg.channel.id === '738109060640931952') {
    if (needTruthReset) {
      embed.setDescription(
        `You have gone through them all! Please use the \`${prefix}resetTruth\` command to start over, or just do some dares!`
      );
      msg.channel.send({ embed });
    } else {
      if (truthsDone.length == truths.length - 1) {
        embed.setDescription(
          `You have gone through them all! Please use the \`${prefix}resetTruth\` command to start over, or just do some dares!`
        );
        msg.channel.send({ embed });
        needTruthReset = true;
      } else {
        msg.channel.send('thinking of truth...');
        chooseTruth();
        msg.reply(truths[chosen]);
        truthsDone.push(chosen);
      }
    }
  } else if (msg.content.toLowerCase() === prefix + 'truth') {
    embed.setTitle('Error');
    embed.setDescription(
      'You can only use me in the truth or dare channel!'
    );
    msg.channel.send({ embed });
  }
  if (msg.content.toLowerCase() == prefix + 'credits') {
    embed.setTitle('Credits');
    embed.setDescription(
      "***Hi!***\nThank you for using `WillBot`. I'm sure you can appreciate the time and effort put into this bot!\n***Key People***\n<@!697194959119319130> - Overwhelming majority of things suggested submitted from `Spoink` and help with code\n<@!303097521314725890> - Project Lead / Big Brain Person 😎"
    );
    msg.channel.send({ embed });
  }
  if (msg.content.toLowerCase() === prefix + 'dare' && msg.channel.id === '738109060640931952') {
    if (needDareReset) {
      embed.setDescription(
        `You have gone through them all! Please use the \`${prefix}resetDare\` command to start over, or just do some truths!`
      );
      msg.channel.send({ embed });
    } else {
      if (daresDone.length == dares.length - 1) {
        embed.setDescription(
          `You have gone through them all! Please use the \`${prefix}resetDare\` command to start over, or just do some truths!`
        );
        needDareReset = true;
        msg.channel.send({ embed });
      } else {
        msg.channel.send('thinking of dare...');
        chooseDare();
        msg.reply('I dare you to... ' + dares[chosen]);
        daresDone.push(chosen);
      }
    }
  } else if (msg.content === prefix + 'dare') {
    embed.setTitle('Error');
    embed.setDescription(
      'You can only use me in the truth or dare channel!'
    );
    msg.channel.send({ embed });
  }
  if (msg.content.toLowerCase() == 'ping') {
    msg.channel.send(
      "Pong! I'm alive! Check out my status here: https://stats.uptimerobot.com/pXEYlIzpJJ"
    );
  }
  if (
    msg.content === prefix + 'resetDare' &&
    msg.channel.id === '738109060640931952'
  ) {
    embed.setDescription('Reset Dares!');
    daresDone = [];
    needDareReset = false;
    msg.channel.send({ embed });
  } else if (msg.content.toLowerCase() === prefix + 'resetDare') {
    embed.setDescription(
      'You can only use me in the truth or dare channel!'
    );
    msg.channel.send({ embed });
  }
  if (
    msg.content === prefix + 'resetTruth' &&
    msg.channel.id === '738109060640931952'
  ) {
    embed.setDescription('Reset Truths!');
    truthsDone = [];
    needTruthReset = false;
    msg.channel.send({ embed });
  } else if (msg.content.toLowerCase() === prefix + 'resetTruth') {
    embed.setDescription(
      'You can only use me in the truth or dare channel!'
    );
    msg.channel.send({ embed });
  }
  if (msg.content.toLowerCase().startsWith('hey bot')) {
    msg.reply('hey!');
  }
  if (msg.content.toLowerCase() === prefix + 'shutdown') {
    try {
      await msg.channel.send('Shutting down.');
      bot.destroy();
    } catch {
      msg.channel.send('An error occurred, please try again.');
    }
  }
  if (msg.content.toLowerCase() === prefix + 'help') {
    embed.setDescription(
      `Hey! Heres a list of commands:\n \`${prefix}truth\` \n \`${prefix}dare\` \n \`${prefix}resetTruth\` \n \`${prefix}resetDare\` \n \`Hey Bot!\` \n \`${prefix}nickname [user] [nickname]\` just \`${prefix}nickname [user]\` will reset 
          the users nickname \n \`${prefix}dice [Number of dice to roll](not required)\` \n \`${prefix}say [message]\` \n \`${prefix}sayEmbed [message]\` \n*ADMIN COMMANDS* \n \`${prefix}delete [numberOfMessages](not required)\` \n \`${prefix}kick [user]\` \n \`${prefix}ban [user]\` \n \`${prefix}unban [user]\` \n \`${prefix}giveRole [user] [role]\` \n \`${prefix}removeRole [user] [role]\``
    );
    msg.channel.send({ embed });
  }
  if (msg.channel.id === '738109254036226228') {
    fs = require('fs');
    fs.readFile('number.json', 'utf8', function(err, data) {
      var currentNo = JSON.parse(data)[0].number;
      if (!isNaN(msg.content)) {
        if (msg.content == currentNo + 1) {
          msg.react('✅');
          var jsonStuff = [
            {
              number: currentNo + 1
            }
          ];
          jsonStuff = JSON.stringify(jsonStuff);
          fs.writeFile('number.json', jsonStuff, 'utf8', function() { });
        } else {
          msg.react('❌');
          embed.setDescription(
            '<@' +
            msg.author.id +
            '>  has ruined it! The current number has been reset... start again from 1!'
          );
          msg.channel.send({ embed });
          var jsonStuff = [
            {
              number: 0
            }
          ];
          jsonStuff = JSON.stringify(jsonStuff);
          fs.writeFile('number.json', jsonStuff, 'utf8', function() { });
        }
      }
    });
  }
})
if (msg.content.startsWith(prefix + 'dice')) {
  let number = msg.content.slice(6);
  var result = '';
  if (number === '' || number == '1') {
    embed.setDescription(
      'You rolled a... ' +
      (Math.floor(Math.random() * Math.floor(6)) + 1) +
      '!'
    );
  } else {
    if (isNaN(number)) {
      embed.setDescription('Invalid Input');
    } else if (number <= 600) {
      var total = 0;
      number = parseInt(number, 10);
      result += Math.floor(Math.random() * Math.floor(6)) + 1;
      total += parseInt(result, 10);
      if (number > 2) {
        for (var i = 0; i < number - 2; i++) {
          var current = Math.floor(Math.random() * Math.floor(6)) + 1;
          result += ', ' + current;
          total += parseInt(current, 10);
        }
      }
      var current = Math.floor(Math.random() * Math.floor(6)) + 1;
      result += ' and a ' + current;
      total += current;
      embed.setDescription(
        'You rolled a ' + result + ' for a total of ' + total + '!'
      );
    } else {
      embed.setDescription('Please pick a value equal to or below 600!');
    }
  }
  msg.channel.send({ embed });
}
if (msg.content.startsWith(prefix + 'sayEmbed')) {
  var content = msg.content.slice(10);
  embed.setDescription(content);
  msg.channel.send({ embed });
  msg.delete();
} else if (msg.content.startsWith(prefix + 'say')) {
  var content = msg.content.slice(5);
  msg.channel.send(content);
  msg.delete();
}
  if (msg.content.toLowerCase().startsWith(prefix + 'afk')) {
    var fs = require('fs');
    async function step() {
      //
    }
  }
  if (msg.content.toLowerCase().startsWith(prefix + 'sellall')) {
    var totalAssets = 0;
    var fs = require('fs');
    fs.readFile('shop.json', 'utf8', function readFileCallback(err, data) {
      stuff = JSON.parse(data);
      var items =
        stuff[stuff.findIndex(x => x.userID == msg.author.id)].inv;
      fs.readFile('shopInventory.json', 'utf8', function(err, data) {
        var stuffInv = JSON.parse(data);
        items.forEach(m => {
          var index = stuffInv.findIndex(x => x.id == m);
          totalAssets += stuffInv[index].sellPrice;
        });
      });
    });
    setTimeout(function() {
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
  if (sureSellAll.isReady && msg.author.id == sureSellAll.tag) {
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
        fs.readFile('shopInventory.json', 'utf8', function(err, data) {
          var stuffInv = JSON.parse(data);
          items.forEach(m => {
            var index = stuffInv.findIndex(x => x.id == m);
            totalAssets += stuffInv[index].sellPrice;
          });
        });
        setTimeout(function() {
          stuff[stuff.findIndex(x => x.userID == msg.author.id)].inv = [];
          stuff[
            stuff.findIndex(x => x.userID == msg.author.id)
          ].money += totalAssets;
          fs.writeFile(
            'shop.json',
            JSON.stringify(stuff),
            'utf8',
            function() { }
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
  //admin commands
  if (
    msg.content.startsWith(prefix + 'delete') &&
    msg.member.roles.cache.find(role => role.name === 'Admins')
  ) {
    let amount = msg.content.slice(8);
    if (isNaN(amount) && amount != '') {
      embed.setDescription('Please enter a valid number');
    } else if (amount == '') {
      msg.channel.messages.fetch({ limit: 2 }).then(messages => {
        msg.channel.bulkDelete(messages);
      });
    } else {
      amount = parseInt(amount, 10);
      if (amount >= 99) {
        msg.channel.messages.fetch({ limit: 100 }).then(messages => {
          msg.channel.bulkDelete(messages);
        });
      } else {
        msg.channel.messages.fetch({ limit: amount + 1 }).then(messages => {
          msg.channel.bulkDelete(messages);
        });
      }
    }
  } else if (msg.content.startsWith(prefix + 'delete')) {
    embed.setDescription(
      'You must have the `Admins` role to use this command'
    );
    msg.channel.send({ embed });
  }
  if (
    msg.content.startsWith(prefix + 'kick') &&
    msg.member.roles.cache.find(role => role.name === 'Admins')
  ) {
    let userToKick = msg.content.slice(6);
    userToKick = userToKick.replace(/[\\<>@#&!]/g, '');
    try {
      msg.guild.members.cache
        .find(member => member.id === userToKick)
        .kick();
      msg.delete();
    } catch {
      embed.setDescription('Invalid User');
    }
  } else if (msg.content.startsWith(prefix + 'kick')) {
    embed.setDescription(
      'You must have the `Admins` role to use this command'
    );
  }
  if (
    msg.content.startsWith(prefix + 'ban') &&
    msg.member.roles.cache.find(role => role.name === 'Admins')
  ) {
    let userToKick = msg.content.slice(5);
    userToKick = userToKick.replace(/[\\<>@#&!]/g, '');
    try {
      msg.guild.members.cache
        .find(member => member.id === userToKick)
        .ban();
      msg.delete();
    } catch {
      embed.setDescription('Invalid User');
    }
    msg.channel.send({ embed });
  } else if (msg.content.startsWith(prefix + 'ban')) {
    embed.setDescription(
      'You must have the `Admins` role to use this command'
    );
    msg.channel.send({ embed });
  }
  if (
    msg.content.startsWith(prefix + 'unban') &&
    msg.member.roles.cache.find(role => role.name === 'Admins')
  ) {
    let userToKick = msg.content.slice(8);
    userToKick = userToKick.replace(/[\\<>@#&!]/g, '');
    try {
      msg.guild.members.unban(userToKick);
      msg.delete();
    } catch {
      embed.setDescription('Invalid User');
    }
    msg.channel.send({ embed });
  } else if (msg.content.startsWith(prefix + 'unban')) {
    embed.setDescription(
      'You must have the `Admins` role to use this command'
    );
    msg.channel.send({ embed });
  }
  if (
    msg.content.startsWith(prefix + 'giveRole') &&
    msg.member.roles.cache.find(role => role.name === 'Admins')
  ) {
    let usertoRole = msg.content.slice(10, 31);
    usertoRole = usertoRole.replace(/[\\<>@#&!]/g, '');
    if (usertoRole.length == 17) {
      usertoRole = usertoRole.substring(0, 17);
    }
    let roletogive = msg.content.slice(33);
    roletogive = roletogive.replace(/[\\<>@#&!]/g, '');
    try {
      if (msg.guild.roles.cache.find(role => role.id === roletogive)) {
        msg.guild.members.cache
          .find(member => member.id === usertoRole)
          .roles.add(
            msg.guild.roles.cache.find(role => role.id === roletogive)
          );
        embed.setDescription(
          'successfully gave role <@&' +
          msg.guild.roles.cache.find(role => role.id === roletogive).id +
          '> to <@' +
          msg.guild.members.cache.find(member => member.id === usertoRole)
            .id +
          '>'
        );
      } else if (
        msg.guild.members.cache.find(member => member.id === usertoRole)
      ) {
        embed.setDescription('No such role exists!');
      } else {
        embed.setDescription('No such user exists!');
      }
    } catch {
      embed.setDescription('Invalid Input');
    }
    msg.channel.send({ embed });
  } else if (msg.content.startsWith(prefix + 'giveRole')) {
    embed.setDescription(
      'You must have the `Admins` role to use this command!'
    );
    msg.channel.send({ embed });
  }
  if (
    msg.content.toLowerCase().startsWith(prefix + 'renamechannel') &&
    msg.member.roles.cache.find(role => role.name === 'Admins')
  ) {
    var oldname = msg.channel.name;
    var newname = msg.content.slice(15);
    if (newname != '') {
      msg.channel.setName(newname);
      embed.setTitle('Success');
      embed.setDescription(
        'Successfuly changed channel name from `' +
        oldname +
        '` to `' +
        newname +
        '`'
      );
    } else {
      embed.setTitle('Error');
      embed.setDescription('Please enter a valid name');
    }
    msg.channel.send({ embed });
  } else if (msg.content.toLowerCase().startsWith(prefix + 'renamechannel')) {
    embed.setTitle('Insufficient Privelages');
    embed.setDescription(
      'Sorry, but you must have the `Admins` role to use this command!'
    );
    msg.channel.send({ embed });
  } if (msg.content.toLowerCase().startsWith(prefix + 'renamechannel')) {
    embed.setTitle('Insufficient Privelages');
    embed.setDescription(
      'Sorry, but you must have the `Admins` role to use this command!'
    );
    msg.channel.send({ embed });
  }
});*/