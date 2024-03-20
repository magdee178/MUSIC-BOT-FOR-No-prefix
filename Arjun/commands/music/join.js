const handler = require('../../handlers/message');
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: '>join',
    description: 'Join voice channel',
    aliases: ['>j', ,'>دخول','>ادخل','>أدخل'],
   // usage: '[join, j]',
    async execute(message, args, client) {
      if(message.author.id != "1150890847768936458") return message.channel.send("")
        let player = client.player.players.get(message.guild.id);
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send(new handler().normalEmbed(``))

        if (!player || (player && !player.voiceChannel)) {
            player = client.player.create({
                guild: message.guild.id,
                voiceChannel: channel.id,
                textChannel: message.channel.id,
                selfDeafen: true
            });
            if (!channel.joinable) return message.channel.send(new handler().normalEmbed(`❌ | ليس لدي صلاحية للاتصال.`))
            player.connect();
          if (message.author.bot) return
   message.react('✋')
          //  return message.channel.send(new MessageEmbed().setColor(client.colors.main).setDescription(`${client.emoji.success} | تم الاتصال بنجاح بـ\n<#${message.member.voice.channel.id}>`)).catch((_) => { });
            
        } //else return message.channel.send(new handler().normalEmbed('❌ | انا في قناة اخرى'))
    }
}
