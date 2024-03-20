/*
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
    .setDescription(`${client.emoji.error} | انت لا تملك صلاحية: \`ADMINISTRATOR\` لإستخدام هذا الأمر`)
    );
			
			if (!client.database) return message.channel.send(new handler().normalEmbed('Please ask developer to give a valid MongoDB URI.'))
        const opt = args[0]
        const newPrefix = args[1]

        switch (opt) {
            case 'set': {
                if (!newPrefix) return message.channel.send(new handler().normalEmbed(`${client.emoji.error} | Provide new prefix`))
                set(client, message.guild.id, newPrefix).then(x => {
                    if (!x.error) return message.channel.send(new handler().normalEmbed('✅ | تم تغيير البادئة إلى: ' + newPrefix))
                })
                break;
            }

            case 'reset': {
                reset(client, message.guild.id).then(x => {
                    if (x.error) return message.channel.send(new handler().normalEmbed('No custom prefix was saved'))
                    return message.channel.send(new handler().normalEmbed('✅ | تم إعادة تعيين البادئة'))
                })
                break;
            }

            default: {
                get(message.guild.id).then(x => {
                    return message.channel.send(new handler().normalEmbed(`${client.emoji.error} | تستطيع تغيير البادئة عبر كتابة:\n\`${x.error ? client.defaultPrefix : x.prefix}prefix set\` <new prefix>`))
                })
                break
            }
        }
    }
}
*/
