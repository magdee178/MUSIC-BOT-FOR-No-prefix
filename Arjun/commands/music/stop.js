const handler = require('../../handlers/message');
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'stop',
    description: 'Stop playing song',
    usage: 'stop',
    aliases: ['stop','وقف','ستوب'],
    async execute(message, args, client) {
        const player = client.player.players.get(message.guild.id);
        
     if (!player) {
      let embed = new MessageEmbed().setColor(client.colors.error).setDescription(``);
      return message.channel.send(embed);
    }
    

    const { channel } = message.member.voice;
    if (!channel) return message.channel.send(new handler().normalEmbed(``));

    if (channel.id !== player.voiceChannel) {
      let embed = new MessageEmbed().setColor(client.colors.error).setDescription(``);
      return message.channel.send(embed);
      
    }

    player.stop();
    player.queue.clear();
      if (message.author.bot) return
   message.react('⏹️')
    return message.channel.send({
      embed: {
        color: client.colors.success,
        description: `${client.emoji.success} | لقد تم إيقاف الموسيقى `,
      },
    });
  },
};

  
  
/*const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "stop",
    category: "Music",
    description: "Stops the music",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
	 async execute(message, args, client, prefix) {
  
        //const player = message.client.manager.get(message.guild.id);
                const  player = client.player.players.get(message.guild.id);
        

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor(client.colors.error)
                .setDescription(`${client.emoji.error} | There is no music playing.`);
            return message.channel.send({embeds: [thing]});
        }

        const autoplay = player.get("autoplay")
        if (autoplay === true) {
            player.set("autoplay", false);
        }

        player.stop();
        player.queue.clear();

        //const emojistop = message.client.emoji.stop;

		let thing = new MessageEmbed()
            .setColor(client.colors.main)
            
            .setDescription(`${client.emoji.success} | Music Has been Stopped`)
        message.channel.send({embeds: [thing]});
	
  	}
};
*/
