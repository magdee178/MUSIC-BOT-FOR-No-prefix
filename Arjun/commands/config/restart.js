/*
const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "restart",
        description: "shuts down the client!",
        usage: "shutdown",
        category: "utilities",
        accessableby: "client Owner",
        aliases: ["stopbot"]
    },
    run: async (client, message, args) => {
    if(message.author.id != "1150890847768936458") return message.channel.send("You're the client the owner!")

    const restart = new MessageEmbed()
        .setDescription("**الحساب كان**: ``تم إيقاف التشغيل...`")
        .setColor("RANDOM");

    await message.channel.send({ embeds: [restart] });
        console.log(chalk.red(`[CLIENT] Restarting...`));
            
    process.exit();
    }
};
*/
