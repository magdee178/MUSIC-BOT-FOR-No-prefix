const handler = require('../../handlers/message');
const { format } = require(`../../modules/format`);
module.exports = {
    name: 'skipto',
    description: 'Skip to selected song',
    usage: 'skipto < song >',
    aliases: ['st', 'jump', 'jumpto','قفز','ذهاب'],
    async execute(message, args, client) {
        const player = client.player.players.get(message.guild.id)
        if (!player) return message.channel.send(new handler().normalEmbed(''))
        if (!player.queue.current) return message.channel.send(new handler().normalEmbed(''))
        
        const position = Number(args[0]);
		
		if (!position || position < 0 || position > player.queue.size)
        
        if (!args[0]) return message.channel.send(new handler().normalEmbed(`طريقة الأستخدام\n\n**ذهاب < رقم الأغنية >**`))
        if(isNaN(args[0])) return message.channel.send(new handler().normalEmbed('❌ | هذا ليس رقما'))
        player.skipto(parseInt(args[0]))
          if (message.author.bot) return
   message.react('⏩')
            .then(x => {
              message.channel.send(new handler().normalEmbed(`${client.emoji. success} | تم تخطي الأغنية بنجاح \`${position}\` في قائمة الانتظار`))
                //message.react('⏩').catch((_) => { })
            })
            .catch(err => {
                message.channel.send(new handler().normalEmbed(err))
            })
    }
}

/*const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "skipto",
	aliases: ["jump"],
	category: "music",
	description: "Forward song",
	args: true,
    usage: "<Number of song in queue>",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
	async execute(message, args, client) {

		//const player = message.client.manager.get(message.guild.id);
		const player = client.player.players.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor(client.colors.error)
                .setDescription(`${client.emoji.error} | Currently not playing anything.`);
            return message.channel.send(thing);
        }

        const position = Number(args[0]);
		
		if (!position || position < 0 || position > player.queue.size) { 
			let thing = new MessageEmbed()
                .setColor(client.colors.error)
				.setDescription(`${client.emoji.error} | Usage ${message.client.prefix}skipto <Number of song in queue>`)
            return message.channel.send(thing);
		}

        player.queue.remove(0, position - 1);
        player.skipto(parseInt);
		
		//const emojijump = message.client.emoji.jump;

		let thing = new MessageEmbed()
			.setDescription(`${client.emoji.success} | Song skipped to \`${position}\``)
			.setColor(client.colors.main)
			
			
		return message.channel.send(thing);
	
    }
};
*/

   
