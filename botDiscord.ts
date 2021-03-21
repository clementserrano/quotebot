import { Client, Message } from 'discord.js';
import { getQuotePath } from './functions';
import secrets from './secrets.json';

const bot = new Client();

bot.login(secrets.key).catch(err => console.error(err))
bot.once("ready", () => console.log('started Discord Bot'))


bot.on('error', error => {
    console.error('The websocket connection encountered an error:' + error.message)
});

bot.on("message", (message => {
    if (message.mentions.has(bot.user)) {
        message.member.voice.channel.join().then(connection => {
            getQuotePath().then(path => {
                console.log(path)
                connection.play(path);
            }).catch(err => console.error(err))
        }).catch(err => console.error(err))
    }
}));