const handler = require('../../handlers/message');
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'join',
    description: 'Join voice channel',
    aliases: ['j', 'connect'],
    usage: '[join, j]',
    async execute(message, args, client) {
        let player = client.player.players.get(message.guild.id);
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send(new handler().normalEmbed(`❌ | You aren't connected to a voice channel`))

        if (!player || (player && !player.voiceChannel)) {
            player = client.player.create({
                guild: message.guild.id,
                voiceChannel: channel.id,
                textChannel: message.channel.id,
                selfDeafen: true
            });
            if (!channel.joinable) return message.channel.send(new handler().normalEmbed(`❌ | I don't have permission to connect.`))
            player.connect();
            return message.channel.send(new MessageEmbed().setColor(client.colors.main).setDescription(`${client.emoji.success} | Successfully connected to <#${message.member.voice.channel.id}>`)).catch((_) => { });
            //message.react('✋').
        } else return message.channel.send(new handler().normalEmbed('❌ | I am in another channel'))
    }
}