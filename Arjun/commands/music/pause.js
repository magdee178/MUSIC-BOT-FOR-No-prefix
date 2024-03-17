  



const handler = require('../../handlers/message');

module.exports = {
    name: "pause",
    description: "Pause the player",
    usage: "pause",
    async execute(message, args, client) {
        const player = client.player.players.get(message.guild.id)
        if (!player) return message.channel.send(new handler().normalEmbed(`❌ | Currently not playing anything.`))
        const { channel } = message.member.voice
        if (!channel) return message.channel.send(new handler().normalEmbed(`❌ | You aren't connected to a voice channel`))
        if (player && (channel.id != player?.voiceChannel)) return message.channel.send(new handler().normalEmbed(`❌ | You're not in the same voice channel.`))
        player.pause(true);
        message.channel.send(new handler().normalEmbed(`${client.emoji.success} | Paused the current song.`));
        //message.react('946432888084254730').catch((_) => { })
    }
};