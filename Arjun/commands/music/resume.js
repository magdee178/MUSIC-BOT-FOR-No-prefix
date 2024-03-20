const handler = require('../../handlers/message');

module.exports = {
    name: "resume",
    description: "Resume the player",
    aliases: ['r','تشغيل'],
  //  usage: "resume",
    async execute(message, args, client) {
        const player = client.player.players.get(message.guild.id)
        if (!player) return message.channel.send(new handler().normalEmbed(``))
        const { channel } = message.member.voice
        if (!channel) return message.channel.send(new handler().normalEmbed(``))
        if (player && (channel.id != player?.voiceChannel)) return message.channel.send(new handler().normalEmbed(``))
        player.pause(false);
      if (message.author.bot) return
   message.react('⏯️')
        message.channel.send(new handler().normalEmbed(`${client.emoji.success} | استأنفت الأغنية الحالية.`));
        //message.react('<a:Tick:946432888084254730>').catch((_) => { })
    }
};
