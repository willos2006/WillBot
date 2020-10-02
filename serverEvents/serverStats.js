module.exports = async (client, configFile) => {
  var numberOfUser;
	var numberOfOnline;
  let guild = client.guilds.cache.get(configFile.guildID);
	let userOnline = guild.channels.cache.find(
		channel => channel.id === '739487262248796254'
	);
	let userTot = guild.channels.cache.find(
		channel => channel.id === '739487343668363344'
	);
	setInterval(async function() {
		guild.members.fetch();
		numberOfOnline = guild.members.cache
			.filter(member => member.presence.status != 'offline')
			.array().length;
		if (numberOfOnline != userOnline.name.slice(14)) {
			userOnline.edit({ name: 'Online Users: ' + numberOfOnline });
		}
	}, 1000);
	setInterval(async function() {
		guild.members.fetch();
		numberOfUser = guild.members.cache.array().length;
		if (numberOfUser != userTot.name.slice(13)) {
			userTot.edit({ name: 'Users Total: ' + numberOfUser });
			console.log(`Total: ${numberOfUser}`);
		}
	}, 1000);
}