const handler = require('../../handlers/message');

module.exports = {
    name: 'loop',
    description: 'Loop the player',
    usage: 'loop',
    aliases: ['l','تكرار'],
    async execute(message, args, client) {
        const player = client.player.players.get(message.guild.id);
        if (!player) return message.channel.send(new handler().normalEmbed(``))
        if (!player.queue.current) return message.channel.send(new handler().normalEmbed(''))
        player.toggleLoop()
            .then(async x => {
                await client.playerHandler.savePlayer(client.player.players.get(message.guild.id))
              
                return message.channel.send(new handler().normalEmbed(` ✅ | تم \`تفعيل\` وضع **التكرار** على: __${x.status}__`))
            })
            .catch(err => {
                message.channel.send(new handler().normalEmbed(err))
            })
    }
}
