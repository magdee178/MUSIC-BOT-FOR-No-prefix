const prettyMs = require("pretty-ms");
//const util = require("../util");
const { MessageEmbed, Message, version } = require('discord.js');
const moment = require("moment");
require("moment-duration-format");
const os = require('os')
//const si = require('systeminformation');
module.exports = {
    name: "stats",
    aliases: ["info"],
    usage: `stats, info`,
    async execute (message, args, client) {
  
    const duration1 = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        //const cpu = await si.cpu();
        const d = moment.duration(message.client.uptime);
                    const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} days`;
                    const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} hours`;
                    const seconds = (d.seconds() == 1) ? `${d.seconds()} seconds` : `${d.seconds()} seconds`;
                    const minutes = (d.minutes() == 1) ? `${d.minutes()} minutes` : `${d.minutes()} minutes`;
        const embed = new MessageEmbed()
            .setColor(client.colors.main)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`
\`\`\`yaml
› Version: 3.0.0
› Guilds: ${client.guilds.cache.size.toLocaleString()}
› Users: ${client.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)}
› Shard: 1
› Total Playing: ${client.player.players.size}
› Uptime: ${new Date(client.uptime).toISOString().slice(11, 19)}
› Memory Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB
\`\`\``);
        message.channel.send(embed);
    }
}