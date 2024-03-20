/*
const handler = require('../../handlers/message');

module.exports = {
    name: 'move',
    description: 'Move song',
    usage: 'move < current song place > [ target place ]',
    async execute(message, args, client) {
        const player = client.player.players.get(message.guild.id);
        if (!player) return message.channel.send(new handler().normalEmbed('❌ | Currently not playing anything.'))
        if (!player.queue.current) return message.channel.send(new handler().normalEmbed('❌ | Currently not playing anything.'))
        if (!args[0]) return message.channel.send(new handler().normalEmbed(`${client.emoji.error} | Move <current song place> position place`))
        if(isNaN(args[0]) || (args[1] && isNaN(args[1]))) return message.channel.send(new handler().normalEmbed('❌ | this is not a number'))
        player.move(parseInt(args[0]), parseInt(args[1]))
            .then(async x => {
                await client.playerHandler.savePlayer(client.player.players.get(message.guild.id))
                message.channel.send(new handler().normalEmbed(`${client.emoji. success} | Moved the current song.`));
                //message.react('<a:Tick:946432888084254730>').catch((_) => { })
            })
            .catch(err => {
                message.channel.send(new handler().normalEmbed(err))
            })
    }
}
*/
