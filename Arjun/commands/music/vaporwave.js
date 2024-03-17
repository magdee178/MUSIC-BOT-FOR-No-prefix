const handler = require('../../handlers/message');

module.exports = {
    name: 'vaporwave',
    description: 'Set filter vaporwave for player',
    aliases: ['vp', 'vap'],
    usage: 'vaporwave, vp',
    async execute(message, args, client) {
        const player = client.player.players.get(message.guild.id);
        if (!player) return message.channel.send(new handler().normalEmbed('❌ | Currently not playing anything.'))
        if (!player.queue.current) return message.channel.send(new handler().normalEmbed('❌ | Currently not playing anything.'))

        if (!player.vaporwave) {
            await player.setVaporwave(true)
            await client.playerHandler.savePlayer(client.player.players.get(message.guild.id))
            message.channel.send(new handler().normalEmbed(`✅ | Vaporwave \`Enabled\``))
        } else {
            await player.setVaporwave(false)
            await client.playerHandler.savePlayer(client.player.players.get(message.guild.id))
            message.channel.send(new handler().normalEmbed(`✅ | Vaporwave \`Disabled\``))
        }
    }
}