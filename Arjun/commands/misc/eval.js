const { MessageEmbed, splitMessage } = require('discord.js');
const paginator = require('../../modules/paginator');

module.exports = {
    name: 'eval',
    description: 'Evaluate code',
    usage: 'eval < code >',
    async execute(message, args, client) {
        let authorize;
        if (client.owners.length == 0) { authorize = true } 
      else {
            if (client.owners.includes(message.author.id)) { authorize = true }
        }

        if (!authorize) return message.channel.send('Unauthorized')

        try {
            const code = args.join(" ")
            let evaled = eval(code);
            let type = evaled
            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
            evaled = this.clean(evaled)
            evaled = splitMessage(evaled, {
                maxLength: 1520,
                char: "\n",
                prepend: "",
                append: ""
            });
            let page = new paginator([], { filter: (reaction, user) => user.id === message.author.id, timeout: 3600000 })
            evaled.forEach((code, index) => {
                let result = message.channel.send(new MessageEmbed().setDescription(`\`\`\`js` + '\n' + code + `\n` + `\`\`\``));
                    
                page.add(result)
            })
            page.setTransform((embed, index, total) => embed.setFooter(`Type: ${typeof type} | Time: ${new Date() - message.createdTimestamp}ms | Page ${index + 1} / ${total}`))
            page.start(message.channel);

        } catch (err) {
            return message.channel.send(new MessageEmbed().setDescription(`\`\`\`js` + '\n' + this.clean(err) + `\n` + `\`\`\``))
                
            message.channel.send(embed)
        }
    },
    clean(text) {
        if (typeof text === "string")
            return text
                .replace(/`/g, "`" + String.fromCharCode(8203))
                .replace(/@/g, "@" + String.fromCharCode(8203));
        else return text;
    }
}