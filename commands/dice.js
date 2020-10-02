module.exports = async (bot, config) => {
    const Discord = require('discord.js');
    const settings = require('../settings/settings.json');
    var prefix = settings.prefix;

    var embed = new Discord.MessageEmbed().setColor(0x0046ff);

    bot.on("message", async msg => {
        embed.setFooter(msg.author.tag);
        embed.setTitle('Dice Roll');
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
                    embed.setTitle('Dice Roll Error');
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
                    embed.setTitle('Dice Roll Error');
                    embed.setDescription('Please pick a value equal to or below 600!');
                }
            }
            msg.channel.send({ embed });
        }
    })
}