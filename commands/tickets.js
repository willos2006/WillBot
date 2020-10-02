module.exports = async (client, configFile) => {
  const Discord = require('discord.js');
  const settings = require('../settings/settings.json');
  var prefix = settings.prefix;
  
  client.on('message', async msg => {
    if (msg.author.id != client.user.id) {
			var embed = new Discord.MessageEmbed()
				.setTitle('WillBot')
				.setColor(0x0046ff);
			embed.setFooter(msg.author.tag);
			if (msg.content.toLowerCase() === prefix + 'troubleshoot members') {
				msg.guild.members.cache.forEach(member =>
					console.log(member.user.username)
				);
			}
			if (
				msg.content.toLowerCase().startsWith('-openticket') &&
				msg.channel.id == '748990835844055112'
			) {
				var reason = msg.content.slice(12);
				var user = msg.author.id;
				var id = Math.floor(Math.random() * 100000) + 1;
				msg.guild.roles.create({ data: { name: id } });
				var channelID = 0;
				var msgID = 0;
				setTimeout(function() {
					var topRole = msg.guild.roles.cache.size;
					msg.guild.roles.cache
						.find(role => role.name == `${id}`)
						.setPosition(topRole - 2)
						.then()
						.catch(error => {
							console.log(error);
						});
					msg.guild.members.cache
						.find(member => member.id == msg.author.id)
						.roles.add(
							msg.guild.roles.cache.find(role => role.name == `${id}`)
						);
					msg.guild.channels
						.create('Ticket no: ' + id, {
							permissionOverwrites: [
								{
									id: msg.guild.roles.cache.find(role => role.name == `${id}`),
									allow: ['VIEW_CHANNEL']
								},
								{
									id: msg.guild.roles.everyone.id,
									deny: ['VIEW_CHANNEL']
								},
								{
									id: msg.guild.roles.cache.find(role => role.name == 'Admins'),
									deny: ['VIEW_CHANNEL']
								}
							]
						})
						.then(c => {
							channelID = c.id;
						});
					var ticketReq = msg.guild.channels.cache.find(
						channel => channel.id == '749381667562455190'
					);
					embed.setDescription(
						`User: <@!${
							msg.author.id
						}> has just opened a support ticket for reason: ***${reason}***. Please react to this message to accept it!`
					);
					ticketReq.send({ embed }).then(m => {
						msgID = m.id;
						m.react('✅');
					});
				}, 500);
				setTimeout(function() {
					msg.guild.channels.cache
						.find(channel => channel.id == channelID)
						.send(
							'Thanks for opening a support ticket with us... Please wait patiently while a staff member accepts your request.'
						);
					var data1 = {
						username: user,
						reason: reason,
						id: id,
						channelID: channelID,
						msgID: msgID
					};
					var fs = require('fs');
					fs.readFile('tickets.json', 'utf8', function readFileCallback(
						err,
						data
					) {
						var obj = JSON.parse(data);
						obj.push(data1);
						var json = JSON.stringify(obj);
						fs.writeFile('tickets.json', json, 'utf8', function() {});
					});
					msg.delete();
					embed.setDescription('Opened ticket! Please wait patiently...');
					msg.channel.send({ embed }).then(m => {
						setTimeout(function() {
							m.delete();
						}, 1500);
					});
				}, 1000);
			}
			if (msg.content.toLowerCase() == prefix + 'closeticket') {
				var fs = require('fs');
				fs.readFile('tickets.json', 'utf8', function readFileCallback(
					err,
					data
				) {
					var stuff = JSON.parse(data);
					stuff.forEach(m => {
						if (m.channelID == msg.channel.id) {
							var index = stuff.findIndex(x => x.channelID == msg.channel.id);
							stuff.splice(index, 1);
							stuff = JSON.stringify(stuff);
							fs.writeFile('tickets.json', stuff, 'utf8', function() {});
							msg.channel.delete();
							msg.channel.guild.roles.cache
								.find(role => role.name == m.id)
								.delete();
						}
					});
				});
			}
			if (msg.content == prefix + 'deleteTicketRoles') {
				msg.guild.roles.cache.forEach(r => {
					if (!isNaN(r.name)) {
						r.delete();
					}
      });
    }
  }
});
}
