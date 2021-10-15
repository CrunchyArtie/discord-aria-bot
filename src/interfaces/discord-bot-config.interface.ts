/**
 * Current bot configuration key/values
 */
export interface DiscordBotConfigInterface {
    DISCORD_TOKEN: string;
    DISCORD_CLIENT_ID: string;
    DISCORD_GUILD_ID: string;

    /**
     * Key used to trigger the bot message interaction
     */
    MAGIC_KEY: string;
    FIREBASE_API_KEY: string;
    FIREBASE_AUTH_DOMAIN: string;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_STORAGE_BUCKET: string;
    FIREBASE_MESSAGING_SENDER_ID: string;
    FIREBASE_APP_ID: string;
    FIREBASE_DATABASE_URL: string;

    /**
     * {@link https://tslog.js.org/#/?id=log-level}
     */
    LOG_MIN_LEVEL: string;
}

