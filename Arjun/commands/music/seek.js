const { format } = require(`../../modules/format`);
const handler = require('../../handlers/message');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'seek',
    description: 'Seeks to a certain point in the current track.',
    usage: 'seek <10>',
    aliases: ['تقديم'],
    async execute(message, args, client, prefix) {
      const { channel } = message.member.voice;
        if (!channel) return message.channel.send(new handler().normalEmbed(``))
     if(isNaN(args[0])) return message.channel.send(new MessageEmbed().setColor(client.colors.main).setDescription(`${client.emoji.error} | رقم غير صالح. يرجى تقديم رقم في ثوان.\nطريقة الإستخدام: \`${prefix}seek <seconds>\``));
		const player = client.player.players.get(message.guild.id);
		if(args[0] * 1000 >= player.queue.current.duration || args[0] < 0) return message.channel.send(`${client.emoji.error} | لا يمكن البحث عن ما يتجاوز طول الأغنية.`);
		player.seek(args[0] * 1000);

    if (!player) return message.channel.send(new handler().normalEmbed(``))

		const parsedDuration = format(player.position);
		return message.channel.send(new MessageEmbed().setColor(client.colors.main).setDescription(`${client.emoji.success} | تقديم إلى: ${parsedDuration}`));
	}
}
