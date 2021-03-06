'use strict';

const config = require('../config.json');

/**
 * Parse and validate Discord commands handler
 * @param {*} message 
 */
module.exports = (message) => {
    if (!message.content.startsWith(config.prefix) || message.author.bot)
        return;

    if (!config.botChannelIds.includes(message.channel.id) && message.channel.type !== 'dm')
        return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) 
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command)
        return;

    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply({ embed: { description: 'I can\'t execute that command inside DMs!', color: 0xff1100} });
    }
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        if (command.usage) {
        	reply += `\nThe proper usage would be: \`${config.prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send({ embed: { description: reply, color: 0xff1100} });
    }
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply({ embed: { description: 'There was an error trying to execute that command!', color: 0xff1100} });
    }
};
