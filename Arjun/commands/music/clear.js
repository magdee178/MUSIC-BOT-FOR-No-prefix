const handler = require('../../handlers/message');

module.exports = {
    name: 'clear',
    description: 'Clear the queue',
    usage: 'clear',
    async execute(message, args, client) {
        const player = client.player.players.get(message.guild.id);
        if (!player) return message.channel.send(new handler().normalEmbed('❌ | Currently not playing anything.'))
        if (!player.queue.current) return message.channel.send(new handler().normalEmbed('❌ | Currently not playing anything.'))
        if (player.queue.size === 0) return message.channel.send(new handler().normalEmbed('❌ | No songs in queue.'))
        player.queue.clear()
        await client.playerHandler.savePlayer(client.player.players.get(message.guild.id))
        message.channel.send(new handler().normalEmbed(`✅ | Successfully cleared current queue.`))
    }
}