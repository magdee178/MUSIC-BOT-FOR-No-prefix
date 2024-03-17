const handler = require('../../handlers/message');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'leave',
    aliases: ['stop'],
    description: 'Leave voice channel',
    aliases: ["dc", "disconnect"],
    usage: 'leave',
    async execute(message, args, client) {
        let player = client.player.players.get(message.guild.id);
        const { channel } = message.member.voice;
        if(!player) return message.channel.send(new handler().normalEmbed('❌ | Join a voice channel'))
        if (!channel) return message.channel.send(new handler().normalEmbed('❌ | Connect a voice channel'))
        if (channel.id != player.voiceChannel) return message.channel.send(new handler().normalEmbed('❌ | Connect same voice channel'))
        player.destroy();
        return message.channel.send(new MessageEmbed().setColor(client.colors.main).setDescription(`✅ | Successfully disconnected from <#${message.member.voice.channel.id}>`));
        //message.react('👋').catch((_) => { })
    }
}