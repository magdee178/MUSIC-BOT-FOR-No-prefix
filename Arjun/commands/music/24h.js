  


const handler = require('../../handlers/message');
const autoJoin = require('../../schemas/autoJoin');

module.exports = {
    name: '24/7',
    description: 'bot whether to leave vc when there\'s user inside vc or not',
    aliases: ['247', '24*7', '24-7'],
    usage: '247',
    async execute(message, args, client, prefix) {
    //if (!message.guild.me.hasPermission("MANAGE_GUILD"))
    if (!message.member.hasPermission(["MANAGE_GUILD"]))
    return message.channel.send(new handler().normalEmbed(`${client.emoji.error} | You don't have \`MANAGE_GUILD\` permission for this command!`));

    const player = client.player.players.get(message.guild.id);
    if (!player) return message.channel.send(new handler().normalEmbed(`${client.emoji.error} |  You aren't connected to a voice channel, type ${prefix}join or ${prefix}play`))

    if (player.get('24h').status == false) {
      player.set('24h', { status: true })
      message.channel.send(new handler().normalEmbed(`${client.emoji.success} | 24/7 mode is now \`enabled\` in this server.`))

    await autoJoin.findOneAndDelete({
      guildID: message.guild.id,
    });
    const vc = new autoJoin({
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      guildID: message.guild.id,
			_24h: true,

    });

    vc.save();
    } else {
      
			const vcdata = await autoJoin.findOne({
				guildID: message.guild.id,
			})
      if (vcdata) {
        await vcdata.delete();
	    player.set('24h', { status: false })
      message.channel.send(new handler().normalEmbed(`✅ | 24/7 mode is now \`disabled\` in this server.`))
    }
  }
}
}

//const handler = require('../../handlers/message');
/*const { MessagesEmbed } = require('discord.js')
module.exports = {
    name: '24/7',
    description: 'bot whether to leave vc when there\'s user inside vc or not',
    aliases: ['247', '24/7', '24*7', '24-7'],
    usage: '247',
    async execute(message, args, client) {
      if (!message.member.hasPermission(["MANAGE_GUILD"]))
    return message.channel.send(new MessagesEmbed().setColor(client.colors.error).setDescription(`${client.emoji.error} | You don't have \`MANAGE_GUILD\` permission for this command!`));
        const player = client.player.players.get(message.guild.id);
        if (!player) return message.channel.send(new handler().normalEmbed(`${client.emoji.error} | Currently not playing anything.`));
        if (player.get('24h').status == false) {
            player.set('24h', { status: true });
            await client.playerHandler.savePlayer(client.player.players.get(message.guild.id))
            message.channel.send(new handler().normalEmbed(`${client.emoji.success} | 24/7 mode is now \`enabled\` in this server.`));
        } else {
            player.set('24h', { status: false });
            await client.playerHandler.savePlayer(client.player.players.get(message.guild.id))
            message.channel.send(new handler().normalEmbed(`${client.emoji.success} | 24/7 mode is now \`disabled\` in this server.`));
        }
    }
}*/