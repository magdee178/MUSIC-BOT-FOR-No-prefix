/*
const handler = require('../../handlers/message');

module.exports = {
    name: 'remove',
    description: 'Remove song from queue',
    usage: 'remove < song\'s position >',
    async execute(message, args, client) {
        const player = client.player.players.get(message.guild.id);
        if (!player) return message.channel.send(new handler().normalEmbed(`${client.emoji.error} | Currently not playing anything.`))
        if (player.queue.size == 0) return message.channel.send(new handler().normalEmbed(`${client.emoji.error} | Currently no song in queue`))
        if (!args[0]) return message.channel.send(new handler().noArgument(client, this.name, 'remove < song position >'))
        if (isNaN(args[0])) return message.channel.send(new handler().noArgument(`${client.emoji.error} | Remove <song's position>`))
        if (args[0] > player.queue.size) return message.channel.send(new handler().normalEmbed(`${client.emoji.error} | The queue only have ${player.queue.size} song${player.queue.size > 1 ? 's' : ''} `))
        const targetSong = player.queue[parseInt(args[0] - 1)]
        player.queue.remove((parseInt(args[0])) - 1)
        await client.playerHandler.savePlayer(client.player.players.get(message.guild.id))
        return message.channel.send(new handler().normalEmbed(`${client.emoji.success} | Removed the song`))
    }
}
*/
