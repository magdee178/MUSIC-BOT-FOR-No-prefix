const { MessageEmbed } = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord-buttons');
const handler = require('../../handlers/message');

const fs = require('fs');
const { join } = require("path");

module.exports = {
    name: 'help',
    aliases: ['h'],
    description: 'List all available commands',
    usage: 'help [command name]',
    async execute(message, args, client) {
          try {
            if (!args[0]) {
                let helpEmbed = new MessageEmbed()
                    .setAuthor(`TEC's Help Menu`,client.user.displayAvatarURL())
                    .setColor(client.colors.main)
.setThumbnail(client.user.displayAvatarURL())                  .setDescription(`❤️ **__[TEC Music](https://discord.com/oauth2/authorize?client_id=1203646619522834452&scope=bot&permissions=3459136)__  is Built to Deliver the Best Music Experience.\n ❤️ Thanks For Using __[TEC Music](https://discord.com/oauth2/authorize?client_id=1203646619522834452&scope=bot&permissions=3459136)__ !**`)
                    .setFooter(`Use ${client.prefixes.get(message.guild.id) ? client.prefixes.get(message.guild.id).prefix : client.defaultPrefix}help [command name] to get command information.`)

                const commandFolders = fs.readdirSync(join(__dirname, "..", "..", "commands"))
                let allCategories = []
                commandFolders.forEach((categories, index) => {
                    const counter = index++ + 1;
                    allCategories.push(`${counter}. ${categories} \`${client.prefixes.get(message.guild.id) ? client.prefixes.get(message.guild.id).prefix : client.defaultPrefix}help ${categories}\` `)
                });
                helpEmbed.addField(`➡ __Dev__ [3]`, "`restart`, `reload`, `eval`")
                helpEmbed.addField(`➡ __Config__ [3]`, "`247`, `prefix`, `textchannel`")
                helpEmbed.addField(`➡ __Misc__ [5]`, "`invite`, `help`, `ping`, `node`, `stats`")
                helpEmbed.addField(`➡ __Filters__ [5]`, "`8D`, `bassboost`, `nightcore`, `reset`, `vaporwave`")
                helpEmbed.addField(`➡ __Music__ [18]`, "`autoplay`, `play`, `join`, `leave`, `loop`, `move`, `nowplaying`, `pause`, `clear`, `queue`, `remove`, `resume`, `shuffle`, `skip`, `skipto`, `seek`, `stop`, `volume`")
               
                
                
                let invbutton2 = new MessageButton()
                .setStyle('url')
                .setLabel('Invite Me')
                .setURL('https://discord.com/api/oauth2/authorize?client_id=1203646619522834452&permissions=66452289&scope=bot')
                let invbutton4 = new MessageButton()
                .setStyle('url')
                .setLabel('Vote')
                .setURL('https://discord.gg/7uhXutc9Sr')
                let invbutton3 = new MessageButton()
                .setStyle('url')
                .setLabel('Support')
                .setURL('https://discord.gg/7uhXutc9Sr');
                
                 return message.channel.send(helpEmbed);
                 return message.channel.send({ embed: helpEmbed , button: [invbutton2 , invbutton3
                
                 ] });
                 
            } else {
                let helpEmbed = new MessageEmbed()
                    .setAuthor('Help', client.user.displayAvatarURL())
                    .setColor(client.colors.main)
                    .setDescription(`My current prefix in **${message.guild.name}** is \`${client.prefixes.get(message.guild.id) ? client.prefixes.get(message.guild.id).prefix : client.defaultPrefix}\``)

                let commandFile, category, error;
                try {
                    commandFile = fs.readdirSync(join(__dirname, '..', '..', 'commands', `${args[0]?.toLowerCase()}`)).filter((file) => file.endsWith(".js"));
                    category = true;
                } catch (err) {
                    if (client.commands.find(x => x.name == args[0]?.toLowerCase() || x.aliases && x.aliases.includes(args[0]?.toLowerCase()))) {
                        commandFile = client.commands.find(x => x.name == args[0]?.toLowerCase() || x.aliases && x.aliases.includes(args[0]?.toLowerCase()))
                        category = false;
                    } else {
                        error = true
                    }
                }
                /*if (error) return message.channel.send(new handler().normalEmbed(`No category or command was found!`))
                if (category) {
                    helpEmbed.addField(`${args[0]?.toLowerCase()} [${commandFile.length}]`, '```' + commandFile.join(', ').replace(/.js/gi, '') + '```')*/
                //return message.channel.send()
                /*} else {
                await message.channel.send(new MessageEmbed().setColor(client.colors.main).setAuthor(`${client.user.username}-Help Menu`).setDescription
                    (`**Name**\n\`${commandFile.name ? commandFile.name : "unknown"}\`\n**Aliases**\n\`${(commandFile.aliases && commandFile.aliases.length != 0) ? commandFile.aliases.join(', ') : "-"}\`\n**Usage**\n\`${client.prefixes.get(message.guild.id) ? client.prefixes.get(message.guild.id).prefix : client.defaultPrefix}${commandFile.usage ? commandFile.usage : "-"}\`\n**Description**\n\`${commandFile.description ? commandFile.description : "-"}\``))
                 return  message.channel.send(embed)*/
                }
          
        } catch (err) {
            message.channel.send(new handler().normalEmbed(`Error! ${err}`))
  }  
    }  
}
