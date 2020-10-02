module.exports = async (bot, config) => {
    const Discord = require('discord.js');
    const settings = require("../settings/settings.json");
    var prefix = settings.prefix;
    var embed = new Discord.MessageEmbed().setColor(0x0046ff);

    bot.on('message', async msg => {
        embed.setTitle("WillBot Message");
        if (msg.content.startsWith(prefix + 'sayEmbed')) {
            var content = msg.content.slice(10);
            embed.setDescription(content);
            msg.channel.send({ embed });
            msg.delete();
        }
        else if (msg.content.startsWith(prefix + 'say')) {
            var content = msg.content.slice(5);
            msg.channel.send(content);
            msg.delete();
        }
    })
}