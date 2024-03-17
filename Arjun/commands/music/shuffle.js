const handler = require('../../handlers/message');

module.exports = {
    name: 'shuffle',
    description: 'Shuffle the song in queue',
    aliases: ["sf"],
    usage: 'shuffle',
    async execute(message, args, client) {
        const player = client.player.players.get(message.guild.id);
        if (!player) return message.channel.send(new handler().normalEmbed('❌ | Currently not playing anything.'))
        if (!player.queue.current) return message.channel.send(new handler().normalEmbed('❌ | Currently not playing anything.'))
        if (player.queue.size == 0) return message.channel.send(new handler().normalEmbed('❌ | Not enough song to shuffle'))
        player.queue.shuffle()
        await client.playerHandler.savePlayer(client.player.players.get(message.guild.id))
        message.channel.send(new handler().normalEmbed(`${client.emoji.success} | Shuffled the current queue.`))
        //message.react('🔀').catch((_) => { })
    }
}