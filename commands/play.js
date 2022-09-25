const { SlashCommandBuilder } = require('discord.js')
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice')
const ytdl = require('ytdl-core')
const yts = require("yt-search")
const play = require('play-dl')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play song!'),
	async execute(message, content) {
		let song = {}

		const connection = joinVoiceChannel({
			channelId: message.member.voice.channel.id,
			guildId: message.guild.id,
			adapterCreator: message.guild.voiceAdapterCreator,
		})

		const player = createAudioPlayer()

		player.on(AudioPlayerStatus.Playing, () => {
			message.reply(`Playing! ${song[0].title}`)
		})

		player.on(AudioPlayerStatus.Idle, () => {
			global.queue.shift()
			_play()
		})

		player.on("error", error => {
			console.log(error)
		})

		async function _play() {
			if(global.queue.length > 0){
				if (ytdl.validateURL(global.queue[0])) {
					url = global.queue[0]
				} else {
					song = await play.search(global.queue[0], {
						limit: 1
					})
				}
			
				let stream = await play.stream(song[0].url)
			
				// const resource = createAudioResource(stream.stream, { seek: 0, volume: 1 }) // Original
				let resource = createAudioResource(stream.stream, {
					inputType: stream.type
				})
				player.play(resource)
				connection.subscribe(player)
			} else {
				message.reply("Without songs in the list!")
			}
		}

		_play()
	},
}