const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { token } = require('./config.json')

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildVoiceStates
	],
    'partials': [Partials.Channel]
})

client.commands = new Collection()

const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file)
	const command = require(filePath)
	client.commands.set(command.data.name, command)
}

global.queue = []

client.once('ready', () => {
	console.log('Ready to play!')
})

client.on('messageCreate', async (message) => {
    const splitMessage = message.content.split(/ (.*)/s)
    const comm = splitMessage[0]
    const contentMessage = splitMessage[1]

	if (!comm || comm.charAt(0) != '!') return
    const command = message.client.commands.get(comm.split('!')[1])

	try {
		if (comm.split('!')[1] === 'play') global.queue.push(contentMessage)
		await command.execute(message, contentMessage)
	} catch (error) {
		console.error(error)
		await message.reply({ content: 'There was an error while executing this command!', ephemeral: true })
	}
});

client.login(token)