const { SlashCommandBuilder } = require('discord.js')
const fs = require('node:fs');
const path = require('node:path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('List of commands!'),
    async execute(message, content) {
        const commandsPath = path.join(__dirname, '')
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))
        let _reply = ''
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file)
            const command = require(filePath)
            _reply +=`**${command.data.name}** --- ${command.data.description}\n`
        }
        message.reply(_reply)
    },
}