module.exports = async (client, configFile) => {
  const Discord = require('discord.js');
  const embed = new Discord.MessageEmbed()
  const settings = require('../settings/settings.json');
  var prefix = settings.prefix;
  prefix = settings.prefix;

  client.on("message", async msg => {
    if (msg.content.toLowerCase().startsWith(prefix + "dm")) {
      embed.setFooter(msg.author.tag)
      embed.setColor(0x0046ff);
      let args = msg.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
      let user = msg.mentions.members.first() ||
        msg.guild.members.cache.get(args[0])
      var message = args[2];
      if (!user) {
        msg.channel.send('you did not mention a user')
      }
  if(!args.slice(2).j(" ") && !message) {
        embed.setTitle('DM Error');
        embed.setDescription('Please include a message to send.')
      }
      await user.send("MESSAGE FROM " + msg.author.tag + "\n```" + args.slice(2).join(" ") + "```")
      embed.setTitle("DM sent");
      embed.setDescription("DM Sent to <@!" + user + ">");
      msg.channel.send({ embed });
    }
  });
}