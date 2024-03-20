const handler = require('../../handlers/message');
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'play',
    description: 'Play your fav songs',
   // usage: 'play [ url | song name ]',
    aliases: ['p','ش','شغل'],
    async execute(message, args, client) {
        let player = client.player.players.get(message.guild.id);
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send(new handler().normalEmbed(""))
        const permissions = message.member.voice.channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send(new handler().normalEmbed('انا لا أملك صلاحية: \`CONNECT\`'))
        if (!permissions.has('SPEAK')) return message.channel.send(new handler().normalEmbed('انا لا أملك صلاحية: \`SPEAK\`'))
        
        if (player && (channel.id != player?.voiceChannel)) return message.channel.send(new handler().normalEmbed(''))
        if (!args[0]) return message.channel.send(new handler().normalEmbed(`طريقة استعمال الأمر\n\n\`ش [ الوصف ]:\`\nيقوم بتشغيل الأغنية الأولى على **يوتيوب**\n\`ش [ رابط ]:\`\n يبحث على **'يوتيوب' , 'ساوندكلاود' , 'سبوتيفاي'**`))
		try {
        if (!player) {
            player = client.player.create({
                guild: message.guild.id,
                voiceChannel: channel.id,
                textChannel: message.channel.id,
                selfDeafen: true
            });
            if (!channel.joinable) return message.channel.send(new handler().normalEmbed(``))
            player.connect()
        }
		} catch (err) {
			if (message.deletable) message.delete();
			return message.channel.send('Error').then(m => m.delete({ timeout: 5000 }));
		}


    player = client.player.players.get(message.guild.id);
		if (args.length == 0) {
			const fileTypes = ['mp3', 'mp4', 'wav', 'm4a', 'webm', 'aac', 'ogg'];
			if (message.attachments.size > 0) {
				const url = message.attachments.first().url;
				for (let i = 0; i < fileTypes.length; i++) {
					if (url.endsWith(fileTypes[i])) {
						message.args.push(url);
					}
				}
				if (!message.args[0]) return message.channel.send('invalid file').then(m => m.delete({ timeout: 5000 }));
			} else {
				return message.channel.send('Error').then(m => m.delete({ timeout: 5000 }));
			}
		}


    player = client.player.players.get(message.guild.id);

const search = args.join(' ')
    let res

    let msg = message.channel.send(`>>> 🔍 **__بحث عن:__   \`${search}\`**`).then(m => m.delete({ timeout: 7000 }));

		try {
			res = await player.search(search, message.author);
			if (res.loadType === 'LOAD_FAILED') {
				if (!player.queue.current) player.destroy();
				throw res.exception;
			}
		} catch (err) {
			return message.channel.send('Error').then(m => m.delete({ timeout: 5000 }));
		}
		if (res.loadType == 'NO_MATCHES') {
			if (!player.queue.current) player.destroy();
			return message.channel.send('Play Songs Again');

		} else if (res.loadType == 'PLAYLIST_LOADED') {
			if (player.state !== 'CONNECTED') player.connect();

			message.channel.send(new MessageEmbed()
				.setColor("#002a7e")
				.setDescription(`Queued ${res.tracks.length} songs from \`${res.playlist.name}\``));

			player.queue.add(res.tracks);
			if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play();
		} else {
			if (player.state !== 'CONNECTED') player.connect();
			player.queue.add(res.tracks[0]);
			if (!player.playing && !player.paused && !player.queue.size) {
				player.play();
			} else {
        const embed = new MessageEmbed()
					.setColor("#1da300")
					.setDescription(`**لقد وجدت الأغنية:** ${res.tracks[0].title}\n**وقت الأغنية:** ${res.tracks[0].isStream ? '◉ LIVE' : `${new Date(res.tracks[0].duration).toISOString().slice(11, 19)}`} \n> لقد أضفتها إلى قائمتك.🎶`)
          .setFooter(client.user.username, client.user.displayAvatarURL())
				message.channel.send(embed);
			}
		}
	}
};
       
