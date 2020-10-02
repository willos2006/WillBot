module.exports = async (bot, configFile) => {
  var settings = require('../settings/settings.json');
  var prefix = settings.prefix;
  const Discord = require('discord.js');
  const embed = new Discord.MessageEmbed();
  embed.setColor(0x0046ff);
  var dares = [
    'Send a screenshot of your home screen',
    'Tell an embarrasing story',
    'Wear an outfit chosen be other players and send a picture',
    'Wear your clothes backwards',
    'Tell a dirty joke',
    'Eat something without using your hands',
    'Tell a funny joke',
    'Drink salt water',
    'Sent a screenshot of your browser history',
    'Wear your clothes inside out and send a picture',
    'Say something nice about the epic creator of this bot, <@303097521314725890> !',
    'Do twenty pushups',
    'Eat a slice of lemon',
    'Let a player pick a website for you to visit',
    'Draw a face on your stomach',
    'Give a tree a hug',
    'Tell everyone your strangest dream',
    'Video yourself recalling the alphabet backwards',
    'Send a selfie to the group',
    'Sing some Micheal Jackson',
    'Nominate someone else to do a dare',
    'What is the wierdest thing you have done with the opposite sex',
    'Message us a funny or spooky story... Your choice!!',
    'LEAVE THIS SPARE'
  ];

  var truths = [
    'Who of all your family would you save if you could only save one?',
    'Do you love anyone (like a crush)',
    'Who do you like  (crush)',
    'Least favorite person in this server',
    'Most favorite person in this server',
    'Who do you hate most?',
    'How many discord servers are you in?',
    'Who was the last 5 people you dm’ed',
    'LEAVE SPARE'
  ];

  var daresDone = [];
  var truthsDone = [];
  var currentDare;
  var currentTuth;
  var needDareReset = false;
  var needTruthReset = false;
  var chosen;
  var currentNo = 0;

  function chooseDare() {
    var conflict = 1;
    while (conflict > 0) {
      chosen = Math.floor(Math.random() * (dares.length - 1));
      var conflict = 0;
      if (daresDone.length == dares.length - 1) {
        needDareReset = true;
        break;
      } else {
        daresDone.forEach(function(i, index) {
          if (i == chosen) {
            conflict += 1;
          }
        });
      }
    }
  }

  function chooseTruth() {
    var conflict = 1;
    while (conflict > 0) {
      chosen = Math.floor(Math.random() * (truths.length - 1));
      var conflict = 0;
      if (truthsDone.length == truths.length - 1) {
        needTruthReset = true;
        break;
      } else {
        truthsDone.forEach(function(i, index) {
          if (i == chosen) {
            conflict += 1;
          }
        });
      }
    }
  }

  bot.on('message', async msg => {
    embed.setTitle("Truth or Dare")
    embed.setFooter(msg.author.tag)
    if (msg.content.toLowerCase() === prefix + 'truth' && msg.channel.id === '738109060640931952') {
      if (needTruthReset) {
        embed.setDescription(
          `You have gone through them all! Please use the \`${prefix}resetTruth\` command to start over, or just do some dares!`
        );
        msg.channel.send({ embed });
      } else {
        if (truthsDone.length == truths.length - 1) {
          embed.setDescription(
            `You have gone through them all! Please use the \`${prefix}resetTruth\` command to start over, or just do some dares!`
          );
          msg.channel.send({ embed });
          needTruthReset = true;
        } else {
          msg.channel.send('thinking of truth...');
          chooseTruth();
          msg.reply(truths[chosen]);
          truthsDone.push(chosen);
        }
      }
    } else if (msg.content.toLowerCase() === prefix + 'truth') {
      embed.setTitle('Error');
      embed.setDescription(
        'You can only use me in the truth or dare channel!'
      );
      msg.channel.send({ embed });
    }
    if (msg.content.toLowerCase() == prefix + 'credits') {
      embed.setTitle('Credits');
      embed.setDescription(
        "***Hi!***\nThank you for using `WillBot`. I'm sure you can appreciate the time and effort put into this bot!\n***Key People***\n<@!697194959119319130> - Overwhelming majority of things suggested submitted from `Spoink` and help with code\n<@!303097521314725890> - Project Lead / Big Brain Person 😎"
      );
      msg.channel.send({ embed });
    }
    if (msg.content.toLowerCase() === prefix + 'dare' && msg.channel.id === '738109060640931952') {
      if (needDareReset) {
        embed.setDescription(
          `You have gone through them all! Please use the \`${prefix}resetDare\` command to start over, or just do some truths!`
        );
        msg.channel.send({ embed });
      } else {
        if (daresDone.length == dares.length - 1) {
          embed.setDescription(
            `You have gone through them all! Please use the \`${prefix}resetDare\` command to start over, or just do some truths!`
          );
          needDareReset = true;
          msg.channel.send({ embed });
        } else {
          msg.channel.send('thinking of dare...');
          chooseDare();
          msg.reply('I dare you to... ' + dares[chosen]);
          daresDone.push(chosen);
        }
      }
    } else if (msg.content === prefix + 'dare') {
      embed.setTitle('Error');
      embed.setDescription(
        'You can only use me in the truth or dare channel!'
      );
      msg.channel.send({ embed });
    }
    if (msg.content.toLowerCase() == 'ping') {
      msg.channel.send(
        "Pong! I'm alive! Check out my status here: https://stats.uptimerobot.com/pXEYlIzpJJ"
      );
    }
    if (
      msg.content === prefix + 'resetDare' &&
      msg.channel.id === '738109060640931952'
    ) {
      embed.setDescription('Reset Dares!');
      daresDone = [];
      needDareReset = false;
      msg.channel.send({ embed });
    } else if (msg.content.toLowerCase() === prefix + 'resetDare') {
      embed.setDescription(
        'You can only use me in the truth or dare channel!'
      );
      msg.channel.send({ embed });
    }
    if (
      msg.content === prefix + 'resetTruth' &&
      msg.channel.id === '738109060640931952'
    ) {
      embed.setDescription('Reset Truths!');
      truthsDone = [];
      needTruthReset = false;
      msg.channel.send({ embed });
    } else if (msg.content.toLowerCase() === prefix + 'resetTruth') {
      embed.setDescription(
        'You can only use me in the truth or dare channel!'
      );
      msg.channel.send({ embed });
    }
  });
}