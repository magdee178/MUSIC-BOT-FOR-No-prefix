  



const handler = require('../../handlers/message');

module.exports = {
    name: "pause",
    description: "Pause the player",
    usage: "pause",
  aliases: ['توقيف'],
    async execute(message, args, client) {
        const player = client.player.players.get(message.guild.id)
        if (!player) return message.channel.send(new handler().normalEmbed(``))
        const { channel } = message.member.voice
        if (!channel) return message.channel.send(new handler().normalEmbed(``))
        if (player && (channel.id != player?.voiceChannel)) return message.channel.send(new handler().normalEmbed(``))
        player.pause(true);
      if (message.author.bot) return
   message.react('⏯️')
        message.channel.send(new handler().normalEmbed(`${client.emoji.success} | تم إيقاف الأغنية الحالية مؤقتًا.`));
        //message.react('946432888084254730').catch((_) => { })
    }
};
