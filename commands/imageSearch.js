module.exports = async(client, configFile) => {
    const Discord = require('discord.js');
    const embed = new Discord.MessageEmbed();
    var fs = require('fs');
    const settings = require('../settings/settings.json');
    var prefix = settings.prefix;
    prefix = settings.prefix;
    const images = require('google-images');
    const google = new images("9dd208e9bd2092230", "AIzaSyCfs_EiC4mbEouaAoiW1XkXd9WgK01MDSA");

    client.on('message', async msg => {
        if(msg.content.toLowerCase().startsWith(prefix + 'image')){
            var all = await google.search(" ");
            var index = Math.floor(Math.random() * all.length)
            var pictureURL = all[index].url;
            embed.setImage(pictureURL);
            embed.setDescription("Here, have a random image!")
            msg.channel.send({embed});
        }
    })
}