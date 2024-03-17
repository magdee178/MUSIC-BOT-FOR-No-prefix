const { MessageButton } = require("discord-buttons");
const { MessageEmbed } = require("discord.js");
const { PREFIX } = new(require('../../modules/ArjunUtils'))();
const textChannel = require("../../schemas/textChannel");

module.exports = {
    name: 'textchannel',
    description: 'Set Music Channel',
    usage: 'tc <channel>',
	  aliases: ['tc'],
    async execute(message, args, client) {
    const prefix = client.prefixes.get(message.guild.id) ? client.prefixes.get(message.guild.id).prefix : PREFIX;

    try {
      Guild = message.guild;

      // default embed
      const embed = new MessageEmbed();

      if (args[0] === "reset" || args[0] === "clear") {
        const checking = await textChannel.findOneAndDelete({
          GuildID: message.guild.id,
        });

        if (!checking) {
          embed.setColor(client.colors.error).setDescription(`${client.emoji.error} | Please select a channel!`)
          return message.reply(embed);
        }

        embed.setColor(client.colors.error).setDescription(`${client.emoji.success} | Bot channel is clear, everyone can use now in any channel!`)
        return message.reply(embed);
      }


      if (!message.member.hasPermission("MANAGE_GUILD")) {
        embed.setColor(client.colors.error).setDescription(`${client.emoji.error} | You Don't Have \`MANAGE_GUILD\` Permission for this command!`);
        return message.channel.send(embed);
      }
      

      if (!args[0]) {
        embed.setColor(client.colors.main).setTitle(`${Guild.name}`)
        .addField(`**Command**`, `\`\`\`${prefix}textchannel\`\`\``)
        .addField(`**Aliases**`, `\`\`\`tc\`\`\``)
        .addField(`**Description**`, `Bot's Main Commands Channel`)
        .addField("**How To Set Channel ?**", `\`\`\`${prefix}tc #channel\`\`\``)
        .addField("**How To Reset Channel ?**", `\`\`\`${prefix}tc reset\`\`\``)
        return message.channel.send(embed);
      }

      let channel = message.mentions.channels.first();

      if (!channel) {
        embed.setColor(client.color.error).setDescription(`${client.emoji.error} | Invalid channel, please provide text channel!`)
        return message.channel.send(embed);
      }

      await textChannel.findOneAndDelete({
        GuildID: message.guild.id,
      });

      const textc = new textChannel({
        ChannelId: channel.id,
        GuildID: message.guild.id,
          
     });

      textc.save();

      embed.setColor(client.colors.main).setDescription(`${client.emoji.success} | Successfully Channel set For <#${channel.id}>`)
      return message.channel.send(embed);
    } catch (err) {
      const error = new MessageEmbed().setColor(client.colors.error).setDescription(`${client.emoji.error} | An error Occurred \`\`\`${err}\`\`\``);

      return await message.reply(error);
    }
  },
};



