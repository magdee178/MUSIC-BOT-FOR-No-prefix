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
      if(message.author.id != "1150890847768936458") return message.channel.send("")
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
          //embed.setColor(client.colors.error).setDescription(`${client.emoji.error} | الرجاء تحديد قناة!`)
          return message.reply(embed);
        }
if (message.author.bot) return
   message.react('❌')
        //embed.setColor(client.colors.error).setDescription(`${client.emoji.success} | قناة البوت أصبحت واضحة، يمكن للجميع استخدامها الآن في أي قناة!`)
        return message.reply(embed);
      }


      if (!message.member.hasPermission("MANAGE_GUILD")) {
        if (message.author.bot) return
   message.react('❌')
        //embed.setColor(client.colors.error).setDescription(`${client.emoji.error} | انت لا تملك صلاحية: \`MANAGE_GUILD\` لإستخدام هذا الأمر`);
        return message.channel.send(embed);
      }
      

      if (!args[0]) {
        //embed.setColor(client.colors.main).setTitle(`${Guild.name}`)
      //  .addField(`**الأمر**`, `\`\`\`${prefix}textchannel\`\`\``)
      //  .addField(`**أختصار**`, `\`\`\`tc\`\`\``)
       // .addField(`**الوصف**`, `قناة الأوامر الرئيسية للبوت`)
      //  .addField("**كيف تقوم بتحديد القناة**", `\`\`\`${prefix}tc #channel\`\`\``)
      //  .addField("**كيف تقوم بإعادة تعيين القناة**", `\`\`\`${prefix}tc reset\`\`\``)
        return message.channel.send(embed);
      }

      let channel = message.mentions.channels.first();

      if (!channel) {
        embed.setColor(client.color.error).setDescription(`${client.emoji.error} | القناة غير صالحة، يرجى تقديم قناة نصية!`)
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
if (message.author.bot) return
   message.react('✅')
      //embed.setColor(client.colors.main).setDescription(`${client.emoji.success} | تم تعيين القناة بنجاح لـ\n<#${channel.id}>`)
      return message.channel.send(embed);
    } catch (err) {
      const error = new MessageEmbed().setColor(client.colors.error).setDescription(`${client.emoji.error} | An error Occurred \`\`\`${err}\`\`\``);

      return await message.reply(error);
    }
  },
};



