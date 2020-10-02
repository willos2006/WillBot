module.exports = async (client, configFile) => {
  const Discord = require('discord.js');
  const embed = new Discord.MessageEmbed()
  const settings = require('../settings/settings.json');
  var prefix = settings.prefix;
  prefix = settings.prefix
  client.on('message', async msg => {
    embed.setTitle('')
    embed.setFooter(msg.author.tag)
    embed.setColor(0x0046ff);

    if (msg.content.startsWith(prefix + 'nickname')) {
      let user = msg.content.substring(13, 31);
      let nickname = msg.content.slice(33);
      if (nickname == "") {
        msg.channel.guild.members.cache.find(member => member.id == user).setNickname(msg.channel.guild.members.cache.find(member => member.id == user).user.username);
        embed.setTitle("Success!");
        embed.setDescription(`Successfully changed <@!${user}>'s nickname to default.`);
        msg.channel.send({ embed });
      }
      else {
        try {
          msg.channel.guild.members.cache.find(member => member.id == user).setNickname(nickname);
          embed.setTitle("Success!");
          embed.setDescription(`Successfully changed <@!${user}>'s nickname to ${nickname}`);
          msg.channel.send(embed);
        } catch {
          embed.setDescription(`I was unable to change ${user}'s nickname.`)
        }
      }
    }
  });
}