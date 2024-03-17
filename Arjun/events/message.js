const { MessageEmbed } = require('discord.js');
const { PREFIX, LOG_USAGE } = new (require('../modules/ArjunUtils'))();
const chalk = require('chalk');



const textChannel = require("../schemas/textChannel");

module.exports = {
    name: 'message',
    once: false,
    async execute(message, client) {
      
      
        if (!message.guild) return;
        if (message.author.bot) return;
     
        const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        
        let command, args, prefix;
        
        let intro = new MessageEmbed()
            
            .setDescription(`**› My prefix in this server is** \`${client.prefixes.get(message.guild.id) ? client.prefixes.get(message.guild.id).prefix : PREFIX}\`
**› You can see my all commands type \`${client.prefixes.get(message.guild.id) ? client.prefixes.get(message.guild.id).prefix : PREFIX}help\`**
**› Nopru Music**`)
            .setColor('RANDOM')
        if (message.content == `<@!${client.user.id}>` || message.content == `<@${client.user.id}>`) {
            if (!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) return message.member.send(`${client.emoji.error} I need this \`SEND_MESSAGES\` permission.`).catch((_) => { })
            return message.channel.send(intro)
        }

        if (!message.content) return;

        if (client.prefixes.get(message.guild.id)?.prefix) {
            prefix = client.prefixes.get(message.guild.id).prefix
            const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
            if (!prefixRegex.test(message.content)) return;
            const [, matchedPrefix] = message.content.match(prefixRegex);

            args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();
            command = client.commands.get(commandName) || client.commands.find(x => x.aliases && x.aliases.includes(commandName));

        } else {
            prefix = PREFIX
            const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
            if (!prefixRegex.test(message.content)) return;
            const [, matchedPrefix] = message.content.match(prefixRegex);

            args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();
            command = client.commands.get(commandName) || client.commands.find(x => x.aliases && x.aliases.includes(commandName));
        }
        if (!command) return;
        if (!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) return message.member.send(`${client.emoji.error} | I need this \`SEND_MESSAGES\` permission.`).catch((_) => { })
        
        
       
			const isTextChannel = await textChannel.findOne({
        GuildID: message.guild.id,
      });

      if (isTextChannel) {
        const isChannelExist = message.guild.channels.cache.get(isTextChannel.ChannelId);

        if (!isChannelExist) {
          await isTextChannel.delete();
        }

        if (message.channel.id !== isTextChannel.ChannelId && isChannelExist) {
          const errEmbed = new MessageEmbed().setColor(client.colors.error).setDescription(`${client.emoji.error} | Please Use My Commands in <#${isTextChannel.ChannelId}>`);
          return message.channel.send(errEmbed);
        }
      }

        try {
            if (LOG_USAGE) {
                console.log(chalk.magenta(`[LOG] => [COMMANDS] ${message.author.tag} (${message.author.id}) : ${message.content}`))
            }
            await command.execute(message, args, client, prefix)
        } catch (err) {
          const errorEmbed = new MessageEmbed()
                .setDescription(`${client.emoji.error} | Sorry, there was an error while executing **${command.name}**\n\`\`\`${err}\`\`\``)
                .setColor(client.colors.error)//client.guilds.cache.get(message.guild.id).me.displayHexColor != '#000000' ? client.guilds.cache.get(message.guild.id).me.displayHexColor : '#00C7FF')
                
            client.channels.cache.get(client.config.log).send(errorEmbed)
           client.logger.error(err)
        }
    }
};