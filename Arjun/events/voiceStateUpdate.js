const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'voiceStateUpdate',
    once: false,
    async execute(oldC, newC, client) {
        if (newC.id === client.user.id) return;
        const target = await client.users.fetch(newC.id)
        if (target.bot) return;
        if (client.player?.players.get(newC.guild.id) && newC.channelID && !newC.channelID) {
            if (client.player?.players.get(newC.guild.id).get('24h').status === true) return console.log('enabled');
            if (client.channels.cache.get(client.player?.players.get(newC.guild.id).voiceChannel).members.filter(x => !x.user.bot).size === 0) {
                if (client.voiceTimeout.get(newC.guild.id)) clearTimeout(client.voiceTimeout.get(newC.guild.id))
                const timeout = setTimeout(() => {
                    if (client.player?.players.get(newC.guild.id) && client.channels.cache.get(client.player?.players.get(newC.guild.id).voiceChannel).members.filter(x => !x.user.bot).size === 0) {
                       /* const leftEmbed = new MessageEmbed()
                            .setDescription(' leaving the voice channel due to inactivity')
                            .setColor(client.guilds.cache.get(newC.guild.id).me.displayHexColor !== '#000000' ? client.guilds.cache.get(newC.guild.id).me.displayHexColor : '#00C7FF')
                        client.channels.cache.get(client.player?.players.get(newC.guild.id).textChannel)?.send(leftEmbed)*/
                        }
                    clearTimeout(client.voiceTimeout.get(newC.guild.id))
                }, 120000);
                client.voiceTimeout.set(newC.guild.id, { timeout })
            }
        }
    }
};
