const { SlashCommandBuilder } = require('discord.js')
const play = require('play-dl')
const ytdl = require('ytdl-core')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add')
		.setDescription('Song added to list!'),
	async execute(message, content) {
		let title = ''
		if (ytdl.validateURL(content)) {
			title = content
		} else {
			const song = await play.search(content, {
				limit: 1
			})
			title = song[0].title
		}
        message.reply(`${title} --- Song added to list!`)
        global.queue.push(title)
    },
}