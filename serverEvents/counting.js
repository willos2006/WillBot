module.exports = async (bot, config) => {
  const Discord = require('discord.js');
  const settings = require('../settings/settings.json');
  var prefix = settings.prefix;
  var embed = new Discord.MessageEmbed().setColor(0x0046ff);

  bot.on('message', async msg => {
    if (msg.author.id != bot.user.id) {
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
              embed.setTitle("Wrong Number")
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
    }
  })
}