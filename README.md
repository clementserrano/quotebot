# quotebot
Play an audio file from the quotes folder

## Bot Discord
- Mention bot, if you are in a voice channel, joins you and play a random quote
- Stays in the channel and leave after 5 min of inactivity

## Bot Twitch
- Listen a twitch chat, play random quote when `!quote` is written in chat

## Installation
- Fill your *quotes* folder with audio files
- Create a secrets.json file with struct : 
```
{
    "discordKey": "<discord_bot_api_key>",
    "twitchKey": "<twitch_bot_api_key>",
    "twitchUsername": "<username>",
    "musicPlayer": "<music_player_path>"
}
```
*Set musicPlayer to "explorer.exe shell:C:\\Program Files\\WindowsApps\\Microsoft.ZuneMusic_\*_x64__8wekyb3d8bbwe"* to play with groove music