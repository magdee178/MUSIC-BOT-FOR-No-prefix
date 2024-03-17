const { get, set, reset } = require('../../functions/prefix');
const { MessageEmbed } = require('discord.js');
const handler = require('../../handlers/message');

module.exports = {
    name: 'prefix',
    description: 'Set/get prefix',
    aliases: ['prefix'],
    usage: 'prefix [ new prefix ]',
    async execute(message, args, client) {
        
		if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(new MessageEmbed()
    .setColor(client.colors.error)
    .setDescription(`${client.emoji.error} | You don't have \`ADMINISTRATOR\` permission for this Command!`)
    );
			
			if (!client.database) return message.channel.send(new handler().normalEmbed('Please ask developer to give a valid MongoDB URI.'))
        const opt = args[0]
        const newPrefix = args[1]

        switch (opt) {
            case 'set': {
                if (!newPrefix) return message.channel.send(new handler().normalEmbed(`${client.emoji.error} | Provide new prefix`))
                set(client, message.guild.id, newPrefix).then(x => {
                    if (!x.error) return message.channel.send(new handler().normalEmbed('✅ | Successfully prefix set to ' + newPrefix))
                })
                break;
            }

            case 'reset': {
                reset(client, message.guild.id).then(x => {
                    if (x.error) return message.channel.send(new handler().normalEmbed('No custom prefix was saved'))
                    return message.channel.send(new handler().normalEmbed('✅ | Successfully prefix reset'))
                })
                break;
            }

            default: {
                get(message.guild.id).then(x => {
                    return message.channel.send(new handler().normalEmbed(`${client.emoji.error} | You can change prefix type \`${x.error ? client.defaultPrefix : x.prefix}prefix set\` <new prefix>`))
                })
                break
            }
        }
    }
}