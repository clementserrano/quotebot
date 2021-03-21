import * as Discord from 'discord.js';
// import { } from './functions';
import * as secrets from './secrets.json';

const bot = new Discord.Client();

bot.login(secrets.key).catch(err => console.error(err))
bot.once("ready", () => console.log('started Discord Bot'))


bot.on('error', error => {
    console.error('The websocket connection encountered an error:' + error.message)
});

bot.on("message", (message => {
    
}));