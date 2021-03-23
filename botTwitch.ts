import * as tmi from 'tmi.js';
import { getQuotePath } from './functions';
import secrets from './secrets.json';
import { exec } from 'child_process';

const opts = {
    identity: {
        username: secrets.twitchUsername,
        password: secrets.twitchKey
    },
    channels: [
        secrets.twitchUsername
    ]
};

const client = new tmi.client(opts);

client.on('connected', (addr, port) => {
    console.log(`* Connected to ${addr}:${port}`);
});
client.on('message', onMessage);

client.connect();

async function onMessage(target, context, msg, self) {
    if (msg.trim() === '!quote') {
        const path = await getQuotePath();
        console.log(path);
        console.log(`start "${path}"`)
        exec(`start "${secrets.musicPlayer}" "${path}"`)
    }
}