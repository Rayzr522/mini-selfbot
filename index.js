require('dotenv').config();
const path = require('path');
const Discord = require('discord.js');

const client = new Discord.Client();

global.methods = require('./methods');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag} (ID: ${client.user.id})`);
});

client.on('message', async message => {
    if (message.author.id !== client.user.id) {
        return;
    }

    const prefix = process.env.PREFIX;

    if (!message.content.startsWith(prefix)) {
        return;
    }

    const split = message.content.substr(prefix.length).split(' ');
    const command = split[0].toLowerCase();
    const args = split.slice(1);

    let commandFn;
    try {
        commandFn = require(`./commands/${command}`);
    } catch (ignore) {
        return;
    }

    commandFn.client = client;
    try {
        await commandFn.bind(commandFn)(message, args);
    } catch (err) {
        message.edit(`:x: ${err}`)
            .then(m => m.delete(10000));
    }
});

client.login(process.env.TOKEN).catch(err => {
    console.error('Failed to log in!\n', err);
});