module.exports = async (bot, config) => {
    const Discord = require('discord.js');
    const settings = require('../settings/settings.json');
    var prefix = settings.prefix;
    var embed = new Discord.MessageEmbed().setColor(0x0046ff);

    bot.on('message', async msg => {
        embed.setFooter(msg.author.tag);
        if (msg.content.toLowerCase().startsWith(prefix + 'onlinebanking')) {
            var username = encodeURIComponent(msg.author.tag.replace(" ", "%20"));
            embed.setTitle("Bank Statement");
            embed.setDescription("Click on the link below to have access to your online banking:\n https://willbot.willos2006.repl.co/bankstate?id=" + msg.author.id + "&name=" + username + "&fullList=false");
            await msg.author.send({ embed });
            embed.setTitle("Sent DM")
            embed.setDescription("Please check your DM's for the link to your online banking.");
            msg.channel.send({ embed })
        }
        if (msg.content.toLowerCase().startsWith(prefix + "donate") && settings.economyCommandsEnabled == true) {
            var args = [];
            args = msg.content.toLowerCase().split(" ");
            var id = args[1];
            id = id.substring(3, id.length - 1)
            console.log(id)
            var amount = parseFloat(args[2]);
            var currentDate = new Date();
            var date = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();
            var hours = currentDate.getHours();
            if (hours.toString().length < 2) {
                hours = 0 + hours.toString();
            }
            var mins = currentDate.getMinutes();
            if (mins.toString().length < 2) {
                mins = 0 + mins.toString();
            }
            var time = hours + ":" + mins;
            if (id == '') {
                embed.setTitle('Error');
                embed.setDescription("Please enter a valid user");
                msg.channel.send({ embed });
            }
            else if (amount == "") {
                embed.setTitle('Error');
                embed.setDescription("Please enter a valid amount");
                msg.channel.send({ embed });
            }
            else {
                var fs = require('fs');
                fs.readFile('shop.json', 'utf8', function (err, data) {
                    data = JSON.parse(data);
                    var recIndex = data.findIndex(x => x.userID == id);
                    var userIndex = data.findIndex(x => x.userID == msg.author.id);
                    if (recIndex != -1) {
                        if (data[userIndex].money >= amount) {
                            if (userIndex != -1) {
                                data[recIndex].money += parseFloat(amount);
                                data[recIndex].statement.push({
                                    itemName: "Incoming online transfer from: " + msg.author.tag,
                                    itemPrice: amount,
                                    date: date,
                                    time: time
                                });
                                data[userIndex].money -= parseFloat(amount);
                                data[userIndex].statement.push({
                                    itemName: "Outgoing online transfer to: " + msg.guild.members.cache.find(user => user.id == id).user.tag,
                                    itemPrice: (amount * -1),
                                    date: date,
                                    time: time
                                });
                                data = JSON.stringify(data);
                                fs.writeFile('shop.json', data, 'utf8', function(){});
                                embed.setTitle("Transfer Complete");
                                embed.setDescription(`Bank transfer successfully completed. Here is your reciept:`+"```"+`From: ${msg.author.tag}\nTo: ${msg.guild.members.cache.find(user => user.id == id).user.tag}\nAmount: £${parseFloat(amount).toFixed(2)}\nDate: ${date}\nTime: ${time}`+"```");
                                msg.channel.send({embed});
                            }
                            else {
                                embed.setTitle('Error');
                                embed.setDescription("Not enough funds in your account to transfer £" + amount);
                                msg.channel.send({ embed });
                            }
                        }
                        else {
                            embed.setTitle('Error');
                            embed.setDescription("Not enough funds in your account to transfer £" + amount);
                            msg.channel.send({ embed });
                        }
                    }
                    else {
                        embed.setTitle('Error');
                        embed.setDescription("Please enter a valid user");
                        msg.channel.send({ embed });
                    }
                });
            }
        }
        else if (msg.content.toLowerCase().startsWith(prefix + "donate")) {
            embed.setTitle("Economy Commands Disabled");
            embed.setDescription("Sorry, but economy commands are currently disabled...");
            msg.channel.send({ embed });
        }
    });
}