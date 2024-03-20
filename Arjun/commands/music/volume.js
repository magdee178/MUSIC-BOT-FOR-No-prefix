const handler = require('../../handlers/message');


module.exports = {
    name: 'volume',
    description: 'Set volume of the player',
    usage: 'volume [ value ]',
    aliases: ['v', 'vol','صوت','الصوت'],
    async execute(message, args, client) {
        try {
            const player = client.player.players.get(message.guild.id);
          if (!message.member.voice.channel)
                return message.channel.send(new handler().normalEmbed(''))
          
            if (!player) return message.channel.send(new handler().normalEmbed(''))
            if (!args[0]) return message.channel.send(new handler().normalEmbed(`🔉 | حجم الصوت الأن: \`${player.volume}%.\``))
            if (isNaN(args[0])) return message.channel.send(new handler().normalEmbed(``));
            if (args[0] < 0 || args[0] > 150) return message.channel.send(new handler().normalEmbed(`${client.emoji.error} | | تستطيع تحديد حجم الصوت من **0** إلى **150**`));
            player.setVolume(parseInt(args[0]))
          if (message.author.bot) return
   message.react('🔊')
            return message.channel.send(new handler().normalEmbed('🔉 | تم ضبط مستوى الصوت على: \`' + args[0] + '%.\`'))
        } catch (err) {
            message.channel.send(new handler().normalEmbed(``))
        }
    }
};

/*const handler = require('../../handlers/message');


module.exports = {
    name: 'volume',
    description: 'Set volume of the player',
    usage: 'volume [ value ]',
    aliases: ['v', 'vol'],
    async execute(message, args, client) {
        try {
            const player = client.player.players.get(message.guild.id);
            if (!player) return message.channel.send(new handler().normalEmbed(`${client.emoji.error} | Currently not playing anything.`));
            if (!args[0]) return message.channel.send(new handler().normalEmbed(`🔉 | Volume is at \`${player.volume}%.\``))
            if (isNaN(args[0])) return message.channel.send(new handler().noArgument(client, this.name, ['volume [ 0-150 ]']))
            if (args[0] < 0 || args[0] > 150) return message.channel.send(new handler().noArgument(client, this.name, ['volume [ 0-150 ]']))
            player.setVolume(parseInt(args[0]))
            return message.channel.send(new handler().normalEmbed('🔊 | Volume set to \`' + args[0] + '%.\`'))
        } catch (err) {
            message.channel.send(new handler().normalEmbed(`${client.emoji.error} | Oops, there was an error! ` + err))
        }
    }
};*/
