module.exports = async (bot, config) => {
    const Discord = require('discord.js');
    const settings = require('../settings/settings.json');
    var prefix = settings.prefix;
    var embed = new Discord.MessageEmbed().setColor(0x0046ff);

    bot.on('message', async msg => {
        embed.setFooter(msg.author.tag);
        if(msg.content.toLowerCase().startsWith(prefix + 'onlinebanking')){
            embed.setTitle("Bank Statement");
            embed.setDescription("You have requested to see your bank statement... Please click on the link below to view it:\n https://willbot.willos2006.repl.co/bankstate?id="+msg.author.id+"&name="+msg.author.tag);
            msg.channel.send({embed});
        }
    });
}