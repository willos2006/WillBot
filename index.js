//require('dotenv').config();
'use strict';
require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
const configFile = require('./settings/config.json');
const settingFile = require('./settings/settings.json')
var prefix = settingFile.prefix
var stuff;
var json;
bot.setMaxListeners(100);
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
      totMon: '£' + parseInt(totalBotMoney).toFixed(2)
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
keepAlive.keepAlive;
var data = [];

keepAlive.server.get('/data', async (req, res) => {
  var userTot;
	var userOnline;
  let guild = bot.guilds.cache.get(configFile.guildID);
	userTot = guild.members.cache.array().length;
  userOnline = guild.members.cache.filter(user => user.presence.status != 'offline').array().length;
  var botMoney = 0;
  const fs = require('fs');
  fs.readFile('shop.json', 'utf8', function (err, data){
    data = JSON.parse(data);
    data.forEach(m => {
      botMoney += m.money;
    });
  });
  setTimeout(function(){
    var json = {
      tot: userTot,
      totOn: userOnline,
      totMon: "£" + botMoney.toFixed(2)
    }
    res.send(json);
  }, 20)
});

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

  eventFunction = require('./serverEvents/suggestionAdd.js');
  eventFunction(bot, configFile)

  eventFunction = require('./commands/dice.js');
  eventFunction(bot, configFile)

  eventFunction = require('./commands/adminCommands.js');
  eventFunction(bot, configFile)

  eventFunction = require('./commands/sayCommands.js');
  eventFunction(bot, configFile)

  eventFunction = require('./serverEvents/counting.js');
  eventFunction(bot, configFile)

  eventFunction = require('./commands/bankCommands.js');
  eventFunction(bot, configFile)

  eventFunction = require('./commands/imageSearch.js');
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



var fs;

embed.setTitle("WillBot")
embed.setColor('#0099ff')

//misc commands that don't belong in any module
bot.on('message', async msg => {
  embed.setFooter(msg.author.tag)
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
          the users nickname \n \`${prefix}dice [Number of dice to roll](not required)\` \n \`${prefix}say [message]\` \n \`${prefix}sayEmbed [message]\` \n\`${prefix}daily\` will give you your daily dose of money\n\`${prefix}regular\` will give you small burst of money\n\`${prefix}wallet\` will show you your wallet stats\n\`${prefix}onlinebanking\` will give you a link to your WillBot online banking page\n\`${prefix}donate [user] [amount]\` will donate money to a user\n*ADMIN COMMANDS* \n \`${prefix}delete [numberOfMessages](not required)\` \n \`${prefix}kick [user]\` \n \`${prefix}ban [user]\` \n \`${prefix}unban [user]\` \n \`${prefix}giveRole [user] [role]\` \n \`${prefix}removeRole [user] [role]\``
    );
    msg.channel.send({ embed });
  }
});