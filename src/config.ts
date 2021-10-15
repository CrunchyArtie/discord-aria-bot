import {DiscordBotConfigInterface} from './interfaces/discord-bot-config.interface';

require('dotenv').config()


export const config: DiscordBotConfigInterface = {
    DISCORD_TOKEN: process.env.DISCORD_BOT_TOKEN || '',
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID || '',
    DISCORD_GUILD_ID: process.env.DISCORD_GUILD_ID || '',
    MAGIC_KEY: '!',
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY || '',
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN || '',
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || '',
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET || '',
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID || '',
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL || '',
    LOG_MIN_LEVEL: process.env.LOG_MIN_LEVEL || 'info'
}
