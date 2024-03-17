const { MessageEmbed } = require("discord.js");
const handler = require('../../handlers/message');

const { format, delay, swap_pages, swap_pages2 } = require(`../../modules/functions`);
module.exports = {
  name: "queue",
  aliases: ["q", "qu", "Q"],
  async execute(message, args, client, prefix) {
    try {
      const player = client.player.players.get(message.guild.id);

      if (!message.guild.voiceConnection && !player) {
        return message.channel.send(
          new MessageEmbed()
          .setColor(client.colors.error)
          
          .setDescription(`${client.emoji.error} | Join a voice channel`)
        );
      }

      const tracks = player.queue;
    
      if (!player.queue.current) {
        return message.channel.send(
          new MessageEmbed()
          .setColor(client.colors.error)
          
          .setDescription(`${client.emoji.error} | Currently not playing anything.`)
        );
      }

      if (!tracks.length)
        return message.channel.send(
          new MessageEmbed()
            .setAuthor(`Current queue: [ ${player.queue.length} Tracks ]`)
            .setColor(client.colors.main)
            .setDescription(`__**Now Playing**__\n[${player.queue.current.title.substr(0, 60)}](${player.queue.current.uri}) - \`(${player.queue.current.isStream ? 'LIVE STREAM' : format(player.queue.current.duration).split(` | `)[0]})\``)
            .setFooter(`No tracks in the queue`)
        );
      //if not too big send queue in channel
      if (tracks.length < 15)
        return message.channel.send(
          new MessageEmbed()
            .setColor(client.colors.main)
            .setAuthor(`Current queue: [ ${player.queue.length} Tracks ]`)
            .addField(`__Now Playing__`, `**[${player.queue.current.title.substr(0, 60)}](${player.queue.current.uri})** - \`${player.queue.current.isStream ? 'LIVE STREAM' : format(player.queue.current.duration).split(` | `)[0]}\``)
            .setDescription(tracks.map((track, i) =>  `\`${++i}.\` ${track.title.substr(0, 60)} - \`${track.isStream ? 'LIVE STREAM' : format(track.duration).split(` | `)[0]}\` \n`).join(`\n`))
        );
    
      let quelist = [];
      for (let i = 0; i < tracks.length; i += 15) {
        let songs = tracks.slice(i, i + 15);
        quelist.push(songs.map((track, index) => `\`${i + ++index}.\` ${track.title.substr(0, 60)} - \`(${track.isStream ? 'LIVE STREAM' : format(track.duration).split(` | `)[0]})\``).join(`\n`));
      }
      let limit = quelist.length <= 5 ? quelist.length : 5;
      let embeds = [];
      for (let i = 0; i < limit; i++) {
        let desc = String(quelist[i]).substr(0, 2048);
        await embeds.push(
          new MessageEmbed()
            .setColor(client.colors.main)
            .setAuthor(
              `Queue: [ ${player.queue.length} Tracks ]`)
            .addField(`__Now Playing__`, `[${player.queue.current.title.substr(0, 60)}](${player.queue.current.uri}) - \`${player.queue.current.isStream ? 'LIVE STREAM' : format(player.queue.current.duration).split(` | `)[0]}\``)
            .setDescription(desc)
        );
      }
      
      //return susccess message
      return swap_pages2(client, message, embeds);
    } catch (e) {
      console.log(String(e.stack).bgRed);
      return message.channel.send(new MessageEmbed().setColor(client.colors.error).setDescription(`${client.emoji.error} | An error occurred \`${e.message}\``));
    }
  },
};
