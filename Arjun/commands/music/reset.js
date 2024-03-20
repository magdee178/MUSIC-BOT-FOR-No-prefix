/*
const handler = require('../../handlers/message');

module.exports = {
    name: 'reset',
    description: 'Cleared all active filters',
    usage: `reset`,
    async execute(message, args, client) {
        const player = client.player.players.get(message.guild.id);
        if (!player) return message.channel.send(new handler().normalEmbed('❌ | Currently not playing anything.'))
        player.clearEffects();
        message.channel.send(new handler().normalEmbed(`${client.emoji.success} | Successfully cleared all filters.`));
        message.react('✅').catch((_) => {})
    }
}
*/
