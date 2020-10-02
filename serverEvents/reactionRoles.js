module.exports =async (client, configFile) => {
  
  let guild = client.guilds.cache.get(configFile.guildID);
	let rolesChan = guild.channels.cache.find(
		channel => channel.id === '738110183389003818'
	);
	rolesChan.messages.fetch('739234003357401118').then(m => {
		m.react('✅');
	});
	rolesChan.messages.fetch('739234078066475090').then(m => {
		m.react('1️⃣');
		m.react('2️⃣');
		m.react('3️⃣');
	});
	rolesChan.messages.fetch('739234797024706641').then(m => {
		m.react('🔴');
		m.react('🔵');
		m.react('🟢');
		m.react('🟠');
		m.react('🟣');
	});
	rolesChan.messages.fetch('739234158043201539').then(m => {
		m.react('👨');
		m.react('👩');
		m.react('⭕');
	});

  client.on('messageReactionAdd', async (reaction, user) => {
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error);
			return;
		}
	}
	if (reaction.message)
		if (user.id != client.user.id) {
			if (
				reaction.message.id === '739234003357401118' &&
				!reaction.message.guild.members.cache
					.find(member => member.id == user.id)
					.roles.cache.find(role => role.name === 'Verified')
			) {
				reaction.message.guild.members.cache
					.find(member => member.id === user.id)
					.roles.add(
						reaction.message.guild.roles.cache.find(
							role => role.name === 'Verified'
						)
					);
				user.send(
					'You have been verified in my server! Please remember to be respectful and kind at all times! Other than that, do what you like!'
				);
				reaction.message.reactions.resolve('✅').users.remove(user.id);
			} else if (reaction.message.id === '739234003357401118') {
				reaction.message.reactions.resolve('✅').users.remove(user.id);
			}
			if (reaction.message.channel.id == '749381667562455190') {
				fs = require('fs');
				fs.readFile('tickets.json', 'utf8', function readFileCallback(
					err,
					data
				) {
					stuff = JSON.parse(data);
					stuff.forEach(m => {
						if (m.msgID == reaction.message.id) {
							JSON.parse(data).forEach(m => {
								if (m.msgID == reaction.message.id) {
									reaction.message.guild.members.cache
										.find(member => member.id === user.id)
										.roles.add(
											reaction.message.guild.roles.cache.find(
												role => role.name == m.id
											)
										);
									reaction.message.guild.channels.cache
										.find(channel => channel.id == m.channelID)
										.send('Staff <@!' + user.id + '> has joined');
									reaction.message.delete();
								}
							});
						}
					});
				});
			}
			if (reaction.message.id === '739234078066475090') {
				let msg = await reaction.message.channel.messages.fetch(
					'739234078066475090'
				);
				if (
					reaction.message.guild.members.cache
						.find(member => member.id === user.id)
						.roles.cache.find(role => role.name === '13-14')
				) {
					await reaction.message.guild.members.cache
						.find(member => member.id == user.id)
						.roles.remove(
							reaction.message.guild.roles.cache.find(
								role => role.name === '13-14'
							)
						);
				}
				if (
					reaction.message.guild.members.cache
						.find(member => member.id === user.id)
						.roles.cache.find(role => role.name === '15-16')
				) {
					await reaction.message.guild.members.cache
						.find(member => member.id == user.id)
						.roles.remove(
							reaction.message.guild.roles.cache.find(
								role => role.name === '15-16'
							)
						);
				}
				if (
					reaction.message.guild.members.cache
						.find(member => member.id === user.id)
						.roles.cache.find(role => role.name === '17-18')
				) {
					await reaction.message.guild.members.cache
						.find(member => member.id == user.id)
						.roles.remove(
							reaction.message.guild.roles.cache.find(
								role => role.name === '17-18'
							)
						);
				}
				if (
					reaction.emoji.name == '1️⃣' &&
					reaction.message.id === '739234078066475090'
				) {
					reaction.message.guild.members.cache
						.find(member => member.id === user.id)
						.roles.add(
							reaction.message.guild.roles.cache.find(
								role => role.name === '13-14'
							)
						);
					user.send('You have the `13-14` role!');
					reaction.message.reactions.resolve('1️⃣').users.remove(user.id);
				}
				if (
					reaction.emoji.name == '2️⃣' &&
					reaction.message.id === '739234078066475090'
				) {
					reaction.message.guild.members.cache
						.find(member => member.id === user.id)
						.roles.add(
							reaction.message.guild.roles.cache.find(
								role => role.name === '15-16'
							)
						);
					user.send('You have the `15-16` role!');
					reaction.message.reactions.resolve('2️⃣').users.remove(user.id);
				}
				if (
					reaction.emoji.name == '3️⃣' &&
					reaction.message.id === '739234078066475090'
				) {
					reaction.message.guild.members.cache
						.find(member => member.id === user.id)
						.roles.add(
							reaction.message.guild.roles.cache.find(
								role => role.name === '17-18'
							)
						);
					user.send('You have the `17-18` role!');
					reaction.message.reactions.resolve('3️⃣').users.remove(user.id);
				}
			}
			if (reaction.message.id === '739234797024706641') {
				let msg = await reaction.message.channel.messages.fetch(
					'739234797024706641'
				);
				if (
					reaction.message.guild.members.cache
						.find(member => member.id === user.id)
						.roles.cache.find(role => role.name === 'red')
				) {
					await reaction.message.guild.members.cache
						.find(member => member.id == user.id)
						.roles.remove(
							reaction.message.guild.roles.cache.find(
								role => role.name === 'red'
							)
						);
				}
				if (
					reaction.message.guild.members.cache
						.find(member => member.id === user.id)
						.roles.cache.find(role => role.name === 'blue')
				) {
					await reaction.message.guild.members.cache
						.find(member => member.id == user.id)
						.roles.remove(
							reaction.message.guild.roles.cache.find(
								role => role.name === 'blue'
							).id
						);
				}
				if (
					reaction.message.guild.members.cache
						.find(member => member.id === user.id)
						.roles.cache.find(role => role.name === 'green')
				) {
					await reaction.message.guild.members.cache
						.find(member => member.id == user.id)
						.roles.remove(
							reaction.message.guild.roles.cache.find(
								role => role.name === 'green'
							).id
						);
				}
				if (
					reaction.message.guild.members.cache
						.find(member => member.id === user.id)
						.roles.cache.find(role => role.name === 'orange')
				) {
					await reaction.message.guild.members.cache
						.find(member => member.id == user.id)
						.roles.remove(
							reaction.message.guild.roles.cache.find(
								role => role.name === 'orange'
							).id
						);
				}
				if (
					reaction.message.guild.members.cache
						.find(member => member.id === user.id)
						.roles.cache.find(role => role.name === 'purple')
				) {
					await reaction.message.guild.members.cache
						.find(member => member.id == user.id)
						.roles.remove(
							reaction.message.guild.roles.cache.find(
								role => role.name === 'purple'
							).id
						);
				}
				if (reaction.emoji.name == '🔴') {
					await reaction.message.guild.members.cache
						.find(member => member.id === user.id)
						.roles.add(
							reaction.message.guild.roles.cache.find(
								role => role.name === 'red'
							)
						);
					user.send('You chose the color `red`');
					reaction.message.reactions.resolve('🔴').users.remove(user.id);
				}
				if (reaction.emoji.name == '🔵') {
					await reaction.message.guild.members.cache
						.find(member => member.id === user.id)
						.roles.add(
							reaction.message.guild.roles.cache.find(
								role => role.name === 'blue'
							)
						);
					user.send('You chose the color `blue`');
					reaction.message.reactions.resolve('🔵').users.remove(user.id);
				}
				if (reaction.emoji.name == '🟢') {
					await reaction.message.guild.members.cache
						.find(member => member.id === user.id)
						.roles.add(
							reaction.message.guild.roles.cache.find(
								role => role.name === 'green'
							)
						);
					user.send('You chose the color `green`');
					reaction.message.reactions.resolve('🟢').users.remove(user.id);
				}
				if (reaction.emoji.name == '🟠') {
					await reaction.message.guild.members.cache
						.find(member => member.id === user.id)
						.roles.add(
							reaction.message.guild.roles.cache.find(
								role => role.name === 'orange'
							)
						);
					user.send('You chose the color `orange`');
					reaction.message.reactions.resolve('🟠').users.remove(user.id);
				}
				if (reaction.emoji.name == '🟣') {
					await reaction.message.guild.members.cache
						.find(member => member.id === user.id)
						.roles.add(
							reaction.message.guild.roles.cache.find(
								role => role.name === 'purple'
							)
						);
					user.send('You chose the color `purple`');
					reaction.message.reactions.resolve('🟣').users.remove(user.id);
				}
			}
			if (reaction.message.id === '739234158043201539') {
				let msg = await reaction.message.channel.messages.fetch(
					'739234158043201539'
				);
				if (
					reaction.message.guild.members.cache
						.find(member => member.id === user.id)
						.roles.cache.find(role => role.name === 'Male')
				) {
					await reaction.message.guild.members.cache
						.find(member => member.id === user.id)
						.roles.remove(
							reaction.message.guild.roles.cache.find(
								role => role.name === 'Male'
							).id
						);
				}
				if (
					reaction.message.guild.members.cache
						.find(member => member.id === user.id)
						.roles.cache.find(role => role.name === 'Female')
				) {
					await reaction.message.guild.members.cache
						.find(member => member.id === user.id)
						.roles.remove(
							reaction.message.guild.roles.cache.find(
								role => role.name === 'Female'
							).id
						);
				}
				if (
					reaction.message.guild.members.cache
						.find(member => member.id === user.id)
						.roles.cache.find(role => role.name === 'Other')
				) {
					await reaction.message.guild.members.cache
						.find(member => member.id === user.id)
						.roles.remove(
							reaction.message.guild.roles.cache.find(
								role => role.name === 'Other'
							).id
						);
				}
				if (reaction.emoji.name == '👨') {
					await reaction.message.guild.members.cache
						.find(member => member.id === user.id)
						.roles.add(
							reaction.message.guild.roles.cache.find(
								role => role.name === 'Male'
							)
						);
					user.send('You chose the `Male` role');
					reaction.message.reactions.resolve('👨').users.remove(user.id);
				}
				if (reaction.emoji.name == '👩') {
					await reaction.message.guild.members.cache
						.find(member => member.id === user.id)
						.roles.add(
							reaction.message.guild.roles.cache.find(
								role => role.name === 'Female'
							)
						);
					user.send('You chose the `Female` role');
					reaction.message.reactions.resolve('👩').users.remove(user.id);
				}
				if (reaction.emoji.name == '⭕') {
					await reaction.message.guild.members.cache
						.find(member => member.id === user.id)
						.roles.add(
							reaction.message.guild.roles.cache.find(
								role => role.name === 'Other'
							)
						);
					user.send('You chose the `Other` role');
					reaction.message.reactions.resolve('⭕').users.remove(user.id);
				}
			}
		}
});
}