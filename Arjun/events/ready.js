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
        client.user.setActivity(`ZAX Music Pro`, {type: "STREAMING", url: "https://www.twitch.tv/4egy" }), 15000;
      /*  setInterval(() => {
            let statusList = [
                `ZAX Music`,
              `Dev By MaGdEe🛠️`
                
            ]
            let choosenStatus = statusList[Math.round(Math.random() * statusList.length)]
            client.user.setActivity(`Egypt`, { type : "PLAYING" })
        }, 40 * 1000);*/
        console.log(chalk.green(`[CLIENT] => [READY] ${client.user.tag} is now ready!`))
        await Util.delayFor(800)
        client.on('raw', (d) => player.updateVoiceState(d))
      
    }
};
