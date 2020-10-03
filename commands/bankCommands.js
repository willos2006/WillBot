module.exports = async (bot, config) => {
    const Discord = require('discord.js');
    const settings = require('../settings/settings.json');
    var prefix = settings.prefix;
    var embed = new Discord.MessageEmbed().setColor(0x0046ff);

    bot.on('message', async msg => {
        embed.setFooter(msg.author.tag);
        if(msg.content.toLowerCase().startsWith(prefix + 'onlinebanking')){
            var username = encodeURIComponent(msg.author.tag.replace(" ", "%20"));
            embed.setTitle("Bank Statement");
            embed.setDescription("Click on the link below to have access to your online banking:\n https://willbot.willos2006.repl.co/bankstate?id="+msg.author.id+"&name="+username+"&fullList=false");
            await msg.author.send({embed});
            embed.setTitle("Sent DM")
            embed.setDescription("Please check your DM's for the link to your online banking.");
            msg.channel.send({embed})
        }
    });
}