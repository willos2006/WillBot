module.exports = async (client, configFile) => {
  const settings = require('../settings/settings.json');
  var prefix = settings.prefix;
  prefix = settings.prefix;
  client.on('message', async msg => {
      if (
    msg.content.startsWith(prefix + 'removeRole') &&
    msg.member.roles.cache.find(role => role.name === 'Admins')
  ) {
    let usertoRole = msg.content.slice(12, 33);
    usertoRole = usertoRole.replace(/[\\<>@#&!]/g, '');
    if (usertoRole.length == 17) {
      usertoRole = usertoRole.substring(0, 17);
    }
    let roletogive = msg.content.slice(35);
    roletogive = roletogive.replace(/[\\<>@#&!]/g, '');
    try {
      if (
        msg.guild.members.cache
          .find(member => member.id === usertoRole)
          .roles.cache.find(role => role.id === roletogive)
      ) {
        msg.guild.members.cache
          .find(member => member.id === usertoRole)
          .roles.remove(
            msg.guild.roles.cache.find(role => role.id === roletogive)
          );
        embed.setDescription(
          'successfully removed role <@&' +
          msg.guild.roles.cache.find(role => role.id === roletogive).id +
          '> from <@' +
          msg.guild.members.cache.find(member => member.id === usertoRole)
            .id +
          '>'
        );
      } else if (isNaN(usertoRole)) {
        embed.setDescription('No such user exists!');
      } else if (
        !msg.guild.roles.cache.find(role => role.id === roletogive)
      ) {
        embed.setDescription('No such role exists!');
      } else if (
        !msg.guild.members.cache
          .find(member => member.id === usertoRole)
          .roles.cache.find(role => role.id === roletogive)
      ) {
        embed.setDescription('The user does not have the specified role!');
      } else {
        embed.setDescription(
          'There was an undetectable error with your command... Please DM <@303097521314725890> so he can quickly recitfy the problem!'
        );
      }
    } catch {
      if (isNaN(usertoRole)) {
        embed.setDescription('No such user exists!');
      } else if (
        !msg.guild.roles.cache.find(role => role.id === roletogive)
      ) {
        embed.setDescription('No such role exists!');
      } else {
        embed.setDescription('The user does not have the specified role!');
      }
    }
    msg.channel.send({ embed });
  } 
  else if (msg.content.startsWith(prefix + 'removeRole')) {
    embed.setDescription(
      'You must have the `Admins` role to use this command!'
    );
    msg.channel.send({ embed });
  }
  });
};