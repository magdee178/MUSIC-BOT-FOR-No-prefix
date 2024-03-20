const handler = require('../../handlers/message');

module.exports = {
    name: 'shuffle',
    description: 'Shuffle the song in queue',
    aliases: ["sf","خلط"],
    usage: 'shuffle',
    async execute(message, args, client) {
        const player = client.player.players.get(message.guild.id);
        if (!player) return message.channel.send(new handler().normalEmbed(''))
        if (!player.queue.current) return message.channel.send(new handler().normalEmbed(''))
        if (player.queue.size == 0) return message.channel.send(new handler().normalEmbed('❌ | لا توجد أغاني كافية للخلط'))
        player.queue.shuffle()
      if (message.author.bot) return
   message.react('🔀')
        await client.playerHandler.savePlayer(client.player.players.get(message.guild.id))
        message.channel.send(new handler().normalEmbed(`${client.emoji.success} | خلط قائمة الانتظار الحالية.`))
        //message.react('🔀').catch((_) => { })
    }
}
