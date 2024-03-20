/*
const command = require('../../handlers/command');
//const handlers = require('../../handlers/message')
//const { MessagesEmbed } = require('discord.js')
module.exports = {
			name: 'reload',
			aliases: 'rd',
			description: 'Reloads a command',
			args: true,
			usage: '<category> <command>',
			
		
	
	async execute(message, args, client) {
		if (message.author.id !== "1150890847768936458" ) return;
		if (!args[1]) return message.channel.send(`Please provide a command.`);

		const commandName = args[1].toLowerCase();
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return message.channel.send(`لا يوجد أمر بالاسم أو الاسم المستعار \`${commandName}\`, ${message.author}`);
		}

		delete require.cache[require.resolve(`../${args[0]}/${commandName}.js`)];

		try {
			const newCommand = require(`../${args[0]}/${commandName}.js`);
			message.client.commands.set(newCommand.name, newCommand);
		}
		catch (error) {
			client.log(error);
			return message.channel.send(`حدث خطأ أثناء إعادة تحميل الأمر: \`${commandName}\`:\n\`${error.message}\``);
		}
		message.channel.send(`الأمر: \`${commandName}\` تم إعادة تحميل!`);
	}
};
*/
