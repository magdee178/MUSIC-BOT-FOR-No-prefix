const handler = require('../../handlers/message');

module.exports = {
    name: '8d',
    description: 'Set 8d for player',
    aliases: ['8D', '8d'],
    usage: '8d',
    async execute(message, args, client) {
        const player = client.player.players.get(message.guild.id);
        if (!player) return message.channel.send(new handler().normalEmbed(`${client.emoji.error} | Currently not playing anything.`))
        if (!player.queue.current) return message.channel.send(new handler().normalEmbed(`${client.emoji.error} | Currently not playing anything.`))

        if (!player._8d) {
            await player.set8D(true)
            await client.playerHandler.savePlayer(client.player.players.get(message.guild.id))
            message.channel.send(new handler().normalEmbed(`✅ | 8D mode is now \`enabled\` in this server`))
        } else {
            await player.set8D(false)
            await client.playerHandler.savePlayer(client.player.players.get(message.guild.id))
            message.channel.send(new handler().normalEmbed(`✅ | 8D mode is now \`disabled\` in this server`))
        }
    }
}