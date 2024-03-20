const { MessageEmbed } = require("discord.js");
//const autoJoin = require('../../schemas/autoJoin');
const handler = require('../../handlers/message');

module.exports = {
    name: "autoplay",
    aliases: ["ap","تشغيل_تلقائي","التشغيل_التلقائي","اوتو_بلاي","أوتو_بلاي","اوتوبلاي","أوتوبلاي"],
	category: "Music",
    description: "Toggle music autoplay",
    args: false,
    usage: "ap",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    async execute(message, args, client) {

        //const player = message.client.manager.get(message.guild.id);
        const player = client.player.players.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor(client.colors.error)
                .setDescription(`${client.emoji.error} | حالياً لا توجد أغنية تعمل!`);
            return message.channel.send(thing);
        }

        const autoplay = player.get("autoplay");

        //const emojireplay = message.client.emoji.autoplay;

        if (autoplay === false) {
            const identifier = player.queue.current.identifier;
            player.set("autoplay", true);
     if (message.author.bot) return
   message.react('✅')
            player.set("requester", message.author);
            player.set("identifier", identifier);
            const search = `https://www.youtube.com/watch?v=${identifier}&list=RD${identifier}`;
            res = await player.search(search, message.author);
            player.queue.add(res.tracks[1]);
            let thing = new MessageEmbed()
                .setColor(client.colors.main)
    //.setThumnail(`${client.user.displayAvatarURL()}`)
                
                .setDescription(`**تم التشغيل , استمتع**`)
           return message.channel.send(thing);
        } else {
            player.set("autoplay", false);
          if (message.author.bot) return
   message.react('❌')
            player.queue.clear();
            let thing = new MessageEmbed()
                .setColor(client.colors.main)
                
                //.setDescription(`${client.emoji.success} | وضع **التشغيل التلقائي** الأن\`معطّل\` في هذا السيرفر!`)
               
            return message.channel.send(thing);
        }

    }
};
