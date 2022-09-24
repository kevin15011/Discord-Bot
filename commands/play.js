const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Replies with Playing!'),
	async execute(interaction, content) {
		await interaction.reply(`Playing! ${content}`);
	},
};