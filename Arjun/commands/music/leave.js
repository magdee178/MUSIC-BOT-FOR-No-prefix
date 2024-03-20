const handler = require('../../handlers/message');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: '>leave',
    aliases: ['stop'],
    description: 'Leave voice channel',
    aliases: ["dc", "disconnect",">اطلع",">أطلع",">خروج"],
    usage: 'leave',
    async execute(message, args, client) {

if(message.author.id != "1150890847768936458") return message.channel.send("")
        let player = client.player.players.get(message.guild.id);
        const { channel } = message.member.voice;
        if(!player) return message.channel.send(new handler().normalEmbed(''))
        if (!channel) return message.channel.send(new handler().normalEmbed(''))
        if (channel.id != player.voiceChannel) return message.channel.send(new handler().normalEmbed(''))
        player.destroy();
      if (message.author.bot) return
   message.react('👋')
      //  return message.channel.send(new MessageEmbed().setColor(client.colors.main).setDescription(`✅ | تم قطع الاتصال بنجاح من\n<#${message.member.voice.channel.id}>`));
        //message.react('👋').catch((_) => { })
    }
}
