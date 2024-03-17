const lavalink = require('../lavalink/index');
const chalk = require('chalk');
const { Util } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        const player = new lavalink(client);
        client.player = player;
        player.init(client.user.id);
        client.user.setActivity(`@${client.user.username}`, {type: "LISTENING", url: "https://www.twitch.tv/nanotect_" }), 15000;
        /*setInterval(() => {
            let statusList = [
                ``
                
            ]
            let choosenStatus = statusList[Math.round(Math.random() * statusList.length)]
            client.user.setActivity(`@Disney`, { type : "LISTENING" })
        }, 40 * 1000);*/
        console.log(chalk.green(`[CLIENT] => [READY] ${client.user.tag} is now ready!`))
        await Util.delayFor(800)
        client.on('raw', (d) => player.updateVoiceState(d))
      
    }
};
