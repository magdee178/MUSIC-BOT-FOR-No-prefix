const handler = require('../../handlers/message');

module.exports = {
    name: 'skip',
    description: 'Skip current song',
    usage: 'skip',
    aliases: ['s','تخطي'],
    async execute(message, args, client) {
        const player = client.player.players.get(message.guild.id);
        if (!player) return message.channel.send(new handler().normalEmbed(''))
        if (!player.queue.current) return message.channel.send(new handler().normalEmbed(''))
        player.skip()
          if (message.author.bot) return
   message.react('⏭')
            .then(x => {
              message.channel.send(new handler().normalEmbed(`${client.emoji.success} | تخطي الأغنية الحالية.`));
                //message.react('⏭').catch((_) => { })
            })
            .catch(err => {
                message.channel.send(new handler().normalEmbed(err))
            })
    }
}
