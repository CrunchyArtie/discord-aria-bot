import {Message} from 'discord.js';

export interface MessageEventInterface {
    key: string,
    alias?: string[]
    description?: string;
    execute: (message: Message) => Promise<void>
}
