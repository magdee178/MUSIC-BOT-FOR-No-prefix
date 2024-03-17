const handler = require('../../handlers/message');

module.exports = {
    name: 'skip',
    description: 'Skip current song',
    usage: 'skip',
    aliases: ['s'],
    async execute(message, args, client) {
        const player = client.player.players.get(message.guild.id);
        if (!player) return message.channel.send(new handler().normalEmbed('❌ | Currently not playing anything.'))
        if (!player.queue.current) return message.channel.send(new handler().normalEmbed('❌ | Currently not playing anything.'))
        player.skip()
            .then(x => {
              message.channel.send(new handler().normalEmbed(`${client.emoji.success} | Skipped the current song.`));
                //message.react('⏭').catch((_) => { })
            })
            .catch(err => {
                message.channel.send(new handler().normalEmbed(err))
            })
    }
}