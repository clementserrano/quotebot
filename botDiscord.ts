import { Client, Message, StreamDispatcher, StreamOptions, VoiceChannel, VoiceConnection } from 'discord.js';
import { getQuotePath } from './functions';
import secrets from './secrets.json';

// Variables
const bot = new Client();
let loop = false;
let connection: VoiceConnection;
let channel: VoiceChannel;

// Init
bot.login(secrets.discordKey).catch(err => console.error(err))
bot.once("ready", () => console.log('started Discord Bot'))

bot.on('error', error => {
    console.error('The websocket connection encountered an error:' + error.message)
});

// On message
bot.on("message", (message => onMessage(message)));

async function onMessage(message: Message) {
    if (message.mentions.has(bot.user)) {
        if (message.content.includes('help')) {
            message.channel.send("Mention this bot to play a random quote. Add : \n" +
                "- loop : to play quotes after quotes\n" +
                "- leave : to disconnect bot from the channel\n" +
                "- loud ;)");
        } else {
            if (message.member && message.member.voice.channel) {
                channel = message.member.voice.channel;
                connection = await channel.join();
            }
            if (connection) {
                if (message.content.includes('loop')) {
                    if (loop) {
                        loop = false
                    } else {
                        loop = true
                        setTimeout(() => loopQuote());
                    }
                } else if (message.content.includes('leave') && channel) {
                    channel.leave();
                    loop = false;
                } else if (message.content.includes('loud') && channel) {
                    playQuote(6);
                } else {
                    playQuote();
                }
            }
        }
    }
}

async function playQuote(volume?: number): Promise<StreamDispatcher> {
    const path = await getQuotePath();
    console.log(path)
    const opts: StreamOptions = {};
    if (volume) {
        opts.volume = volume;
    }
    return connection.play(path, opts);
}

async function loopQuote() {
    if (loop) {
        let stream = await playQuote();
        stream.on("finish", () => setTimeout(loopQuote, 2000));
    }
}