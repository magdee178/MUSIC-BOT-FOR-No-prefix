const handler = require('../../handlers/message');
const { splitBar } = require('string-progressbar');
const { format } = require(`../../modules/format`);
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'nowplaying',
    description: 'Get now playing song',
    usage: 'nowplaying',
    aliases: ['np','الان','الأن','الآن'],
    async execute(message, args, client) {
        let player = client.player.players.get(message.guild.id);
        if (!player) return message.channel.send(new handler().normalEmbed(''))
        if (!player.queue.current) return message.channel.send(new handler().normalEmbed('❌ | حالياً لا توجد أغنية تعمل!'))
        if (player.get('nowplaying')) { clearInterval(player.get('nowplaying')); player.get('nowplayingMSG').delete().catch(() => { }) }

        const musicLength = (player.queue.current.isStream ? null : ((!player.queue.current || !player.queue.current.duration || isNaN(player.queue.current.duration)) ? null : player.queue.current.duration))
        const nowTime = (!player.position || isNaN(player.position)) ? null : player.position
        const embed = new MessageEmbed()
                            .setAuthor('🎶 | الأغنية الحالية')
    .setTitle(`**Song Name**`)
 .setDescription(`**➥Now Playing:** [${player.queue.current.title}](${player.queue.current.uri})`)
              
.addField(`**➥Song Duration:** \`(${player.queue.current.isStream ? '◉ LIVE' : `${new Date(player.position).toISOString().slice(11, 19)}`})\``, `\`(${player.queue.current.isStream ? '◉ LIVE' : `${new Date(player.queue.current.duration).toISOString().slice(11, 19)}`})\`` )
            .setThumbnail(player.queue.current?.thumbnail ? player.queue.current?.thumbnail : '')
 .setFooter(client.user.username, client.user.displayAvatarURL())
            //.addField(`${parsedDuration} / ${player.position}`)
            //.addField(`\`(${player.queue.current.isStream ? '◉ LIVE' : `${new Date(player.position).toISOString().slice(11, 19)}`})\``, `\`(${player.queue.current.isStream ? '◉ LIVE' : `${new Date(player.queue.current.duration).toISOString().slice(11, 19)}`})\`` )
            .setColor(client.colors.error)
            //.setDescription([splitBar(musicLength ? Number(musicLength) : 1, nowTime ? Number(nowTime) : 2, 20, '▭', '▬')[0]])

        message.channel.send(embed).then(msg => player.set('nowplayingMSG', msg))


        const interval = setInterval(() => {
            player = client.player.players.get(message.guild.id);
            const musicLength = (player.queue.current.isStream ? null : ((!player.queue.current || !player.queue.current.duration || isNaN(player.queue.current.duration)) ? null : player.queue.current.duration))
            const nowTime = (!player.position || isNaN(player.position)) ? null : player.position
            const embed = new MessageEmbed()
                .setAuthor('🎵 | الأغنية الحالية')
    .setTitle(`**Song Name**`)
 .setDescription(`**➥Now Playing:** [${player.queue.current.title}](${player.queue.current.uri})`)
              
.addField(`**➥Song Duration:** \`(${player.queue.current.isStream ? '◉ LIVE' : `${new Date(player.position).toISOString().slice(11, 19)}`})\``, `\`(${player.queue.current.isStream ? '◉ LIVE' : `${new Date(player.queue.current.duration).toISOString().slice(11, 19)}`})\`` )
                //.setURL(player.queue.current.uri)
                .setThumbnail(player.queue.current?.thumbnail ? player.queue.current?.thumbnail : '')
 .setFooter(client.user.username, client.user.displayAvatarURL())
                //.addField(`\`(${player.queue.current.isStream ? '◉ LIVE' : `${new Date(player.position).toISOString().slice(11, 19)}`})\``, `\`(${player.queue.current.isStream ? '◉ LIVE' : `${new Date(player.queue.current.duration).toISOString().slice(11, 19)}`})\``)
                .setColor(client.colors.error)
                //.setDescription([splitBar(musicLength ? Number(musicLength) : 1, nowTime ? Number(nowTime) : 2, 20, '▭', '▬')[0]])

            player?.get('nowplayingMSG') ? player.get('nowplayingMSG').edit(embed) : message.channel.send(embed).then(msg => player.set('nowplayingMSG', msg))
        }, 5000);
        player.set('nowplaying', interval)
    }
}
