const handler = require('../../handlers/message');

module.exports = {
    name: 'loop',
    description: 'Loop the player',
    usage: 'loop',
    aliases: ['l'],
    async execute(message, args, client) {
        const player = client.player.players.get(message.guild.id);
        if (!player) return message.channel.send(new handler().normalEmbed(`❌ | Currently not playing anything.`))
        if (!player.queue.current) return message.channel.send(new handler().normalEmbed('❌ | Currently not playing anything.'))
        player.toggleLoop()
            .then(async x => {
                await client.playerHandler.savePlayer(client.player.players.get(message.guild.id))
                return message.channel.send(new handler().normalEmbed(`✅ | Loop \`enabled\`  ${x.status}`))
            })
            .catch(err => {
                message.channel.send(new handler().normalEmbed(err))
            })
    }
}