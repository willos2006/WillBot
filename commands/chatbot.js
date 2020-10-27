module.exports = (client, configFile) => {
  const discord = require('discord.js');
  const dialogflow = require('@google-cloud/dialogflow');
  const uuid = require('uuid');
  var embed = new discord.MessageEmbed();
  embed.setColor(0x0046ff);
  var settings = require('../settings/settings.json');
  var prefix = settings.prefix;

  client.on('message', async msg => {
    embed.setFooter(msg.author.tag);
    if(msg.author.id === client.user.id) return;
    if(msg.content.split('-').length > 1) return;
    if(msg.channel.id.toString() == configFile.talkChannel && !msg.author.bot){
        var sessionID = uuid.v4();
        var sessionClient = new dialogflow.SessionsClient();
        var sessionPath = sessionClient.projectAgentSessionPath(process.env.PROJECT_ID, sessionID);
        var request = {
          session: sessionPath,
          queryInput: {
            text: {
              text: msg.content,
              languageCode: 'en-US'
            },
          },
        };
        var responses = await sessionClient.detectIntent(request);
        var result = responses[0].queryResult.fulfillmentText;
        msg.channel.send(result);
    }
  })
}