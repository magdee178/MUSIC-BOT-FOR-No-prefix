const { format } = require(`../../modules/format`);
const handler = require('../../handlers/message');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'seek',
    description: 'Seeks to a certain point in the current track.',
    usage: 'seek <10>',
    aliases: [''],
    async execute(message, args, client, prefix) {
      const { channel } = message.member.voice;
        if (!channel) return message.channel.send(new handler().normalEmbed(`❌ | You aren't connected to a voice channel`))
     if(isNaN(args[0])) return message.channel.send(new MessageEmbed().setColor(client.colors.main).setDescription(`${client.emoji.error} | Invalid number. Please provide a number in seconds.\nCorrect Usage: \`${prefix}seek <seconds>\``));
		const player = client.player.players.get(message.guild.id);
		if(args[0] * 1000 >= player.queue.current.duration || args[0] < 0) return message.channel.send(`${client.emoji.error} | Cannot seek beyond length of song.`);
		player.seek(args[0] * 1000);

    if (!player) return message.channel.send(new handler().normalEmbed(`${client.emoji.error} | You aren't connected to a voice channel type ${prefix}join or ${prefix}play`))

		const parsedDuration = format(player.position);
		return message.channel.send(new MessageEmbed().setColor(client.colors.main).setDescription(`${client.emoji.success} | Seeked to ${parsedDuration}`));
	}
 }
