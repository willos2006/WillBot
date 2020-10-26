module.exports = (client, configFile) => {
  const discord = require('discord.js');
  var embed = new discord.MessageEmbed();
  embed.setColor(0x0046ff);
  var settings = require('../settings/settings.json');
  var prefix = settings.prefix;

  client.on('message', async msg => {
    embed.setFooter(msg.author.tag);
    if(message.author.id === client.user.id) return;
    if(msg.channel.id.toString() == configFile.talkChannel && !msg.author.bot){
        
    }
  })
}