const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription('List of song!'),
	async execute(message, content) {
        message.reply((global.queue.length > 0) ? global.queue.join('\n') : 'Empty list!')
    },
}