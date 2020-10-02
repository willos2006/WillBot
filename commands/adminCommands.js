module.exports = async (bot, config) => {
  const Discord = require('discord.js');
  const settings = require('../settings/settings.json');

  var embed = new Discord.MessageEmbed().setColor(0x0046ff);

  var prefix = settings.prefix

  bot.on('message', async msg => {
    embed.setFooter(msg.author.tag);
    if (
      msg.content.startsWith(prefix + 'delete') &&
      msg.member.roles.cache.find(role => role.name === 'Admins')
    ) {
      let amount = msg.content.slice(8);
      if (isNaN(amount) && amount != '') {
        embed.setDescription('Please enter a valid number');
      } else if (amount == '') {
        msg.channel.messages.fetch({ limit: 2 }).then(messages => {
          msg.channel.bulkDelete(messages);
        });
      } else {
        amount = parseInt(amount, 10);
        if (amount >= 99) {
          msg.channel.messages.fetch({ limit: 100 }).then(messages => {
            msg.channel.bulkDelete(messages);
          });
        } else {
          msg.channel.messages.fetch({ limit: amount + 1 }).then(messages => {
            msg.channel.bulkDelete(messages);
          });
        }
      }
    } else if (msg.content.startsWith(prefix + 'delete')) {
      embed.setDescription(
        'You must have the `Admins` role to use this command'
      );
      msg.channel.send({ embed });
    }
    if (
      msg.content.startsWith(prefix + 'kick') &&
      msg.member.roles.cache.find(role => role.name === 'Admins')
    ) {
      let userToKick = msg.content.slice(6);
      userToKick = userToKick.replace(/[\\<>@#&!]/g, '');
      try {
        msg.guild.members.cache
          .find(member => member.id === userToKick)
          .kick();
        msg.delete();
      } catch {
        embed.setDescription('Invalid User');
      }
    } else if (msg.content.startsWith(prefix + 'kick')) {
      embed.setDescription(
        'You must have the `Admins` role to use this command'
      );
    }
    if (
      msg.content.startsWith(prefix + 'ban') &&
      msg.member.roles.cache.find(role => role.name === 'Admins')
    ) {
      let userToKick = msg.content.slice(5);
      userToKick = userToKick.replace(/[\\<>@#&!]/g, '');
      try {
        msg.guild.members.cache
          .find(member => member.id === userToKick)
          .ban();
        msg.delete();
      } catch {
        embed.setDescription('Invalid User');
      }
      msg.channel.send({ embed });
    } else if (msg.content.startsWith(prefix + 'ban')) {
      embed.setDescription(
        'You must have the `Admins` role to use this command'
      );
      msg.channel.send({ embed });
    }
    if (
      msg.content.startsWith(prefix + 'unban') &&
      msg.member.roles.cache.find(role => role.name === 'Admins')
    ) {
      let userToKick = msg.content.slice(8);
      userToKick = userToKick.replace(/[\\<>@#&!]/g, '');
      try {
        msg.guild.members.unban(userToKick);
        msg.delete();
      } catch {
        embed.setDescription('Invalid User');
      }
      msg.channel.send({ embed });
    } else if (msg.content.startsWith(prefix + 'unban')) {
      embed.setDescription(
        'You must have the `Admins` role to use this command'
      );
      msg.channel.send({ embed });
    }
    if (
      msg.content.toLowerCase().startsWith(prefix + 'renamechannel') &&
      msg.member.roles.cache.find(role => role.name === 'Admins')
    ) {
      var oldname = msg.channel.name;
      var newname = msg.content.slice(15);
      if (newname != '') {
        msg.channel.setName(newname);
        embed.setTitle('Success');
        embed.setDescription(
          'Successfuly changed channel name from `' +
          oldname +
          '` to `' +
          newname +
          '`'
        );
      } else {
        embed.setTitle('Error');
        embed.setDescription('Please enter a valid name');
      }
      msg.channel.send({ embed });
    } else if (msg.content.toLowerCase().startsWith(prefix + 'renamechannel')) {
      embed.setTitle('Insufficient Privelages');
      embed.setDescription(
        'Sorry, but you must have the `Admins` role to use this command!'
      );
      msg.channel.send({ embed });
    }
  })
}