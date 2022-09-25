const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skiped song!'),
	async execute(message, content) {
        global.queue.shift()
		const command = message.client.commands.get('play')
		await command.execute(message, '')
    },
}