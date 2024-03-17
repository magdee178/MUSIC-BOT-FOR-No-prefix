const handler = require('../../handlers/message');
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'play',
    description: 'Play your fav songs',
    usage: 'play [ url | song name ]',
    aliases: ['p'],
    async execute(message, args, client) {
        let player = client.player.players.get(message.guild.id);
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send(new handler().normalEmbed("❌ | You aren't connected to a voice channel"))
        const permissions = message.member.voice.channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send(new handler().normalEmbed('I don\'t have \`CONNECT\` permission'))
        if (!permissions.has('SPEAK')) return message.channel.send(new handler().normalEmbed('I don\'t have \`SPEAK\` permission'))
        
        if (player && (channel.id != player?.voiceChannel)) return message.channel.send(new handler().normalEmbed('❌ | You\'re not in same voice channel'))
        if (!args[0]) return message.channel.send(new handler().normalEmbed(`${client.emoji.error} | You can play song play <songs name / url>`))
		try {
        if (!player) {
            player = client.player.create({
                guild: message.guild.id,
                voiceChannel: channel.id,
                textChannel: message.channel.id,
                selfDeafen: true
            });
            if (!channel.joinable) return message.channel.send(new handler().normalEmbed(`${client.emoji.error} | I can't join this channel.`))
            player.connect()
        }
		} catch (err) {
			if (message.deletable) message.delete();
			return message.channel.send('Error').then(m => m.delete({ timeout: 10000 }));
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
				if (!message.args[0]) return message.channel.send('invalid file').then(m => m.delete({ timeout: 10000 }));
			} else {
				return message.channel.send('Error').then(m => m.delete({ timeout: 10000 }));
			}
		}


    player = client.player.players.get(message.guild.id);

const search = args.join(' ')
    let res

    let msg = message.channel.send(`>>> 🔍 **__Searching__   \`${search}\`**`);

		try {
			res = await player.search(search, message.author);
			if (res.loadType === 'LOAD_FAILED') {
				if (!player.queue.current) player.destroy();
				throw res.exception;
			}
		} catch (err) {
			return message.channel.send('Error').then(m => m.delete({ timeout: 10000 }));
		}
		if (res.loadType == 'NO_MATCHES') {
			if (!player.queue.current) player.destroy();
			return message.channel.send('Play Songs Again');

		} else if (res.loadType == 'PLAYLIST_LOADED') {
			if (player.state !== 'CONNECTED') player.connect();

			message.channel.send(new MessageEmbed()
				.setColor("RANDOM")
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
					.setColor("RANDOM")
					.setDescription(`😎 Adding **${res.tracks[0].title}** in queue`)
          .setFooter(`Nopru Music`)
				message.channel.send(embed);
			}
		}
	}
};
       