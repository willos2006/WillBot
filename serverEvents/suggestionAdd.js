module.exports = async (client, config) => {

    client.on('message', async msg => {
        if (msg.channel.id == 738757083381366916) {
            msg.react('✅');
        }
    });
}