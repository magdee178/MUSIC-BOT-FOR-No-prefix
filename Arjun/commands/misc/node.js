/*
module.exports = {
    name: 'node',
    description: 'Get lavalink node\'s status',
    usage: 'node',
    async execute(message, args, client) {
        let all = []

        client.player.nodes.forEach(node => {
            let info = []
            info.push(`ID: ${(node.options.identifier)}`)
            info.push(`Stats: CONNECTED`)
            info.push(`Active: ${node.stats.players}`)
            info.push(`Uptime: ${new Date(node.stats.uptime).toISOString().slice(11, 19)}`)
           
            info.push(`Cores: ${node.stats.cpu.cores}`)
            info.push(`Load: ${(Math.round(node.stats.cpu.systemLoad * 100) / 100).toFixed(2)}% • ${(Math.round(node.stats.cpu.lavalinkLoad * 1024) / 1024).toFixed(2)}`)
            all.push(info.join('\n'))
        });
        
const embed = new (require('discord.js').MessageEmbed)()
    
            .setDescription(`\`\`\`yaml\n${all.join('\n\n \n')}\`\`\``).setColor(client.colors.main);
        message.channel.send(embed)
    }
}
*/
