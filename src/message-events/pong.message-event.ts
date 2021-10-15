import {MessageEventInterface} from '../interfaces/message-event.interface';
import {Log} from '../index';

/**
 * Event use to respond `pong`, just to check if the bot is alive.
 */
export const PongMessageEvent: MessageEventInterface = {
    key: 'ping',
    alias: ['p'],
    description: 'Retourne pong.',
    execute: async (message) => {
        Log.debug(`ping message from ${message.author.tag}`);
        await message.reply('pong !')
    }
}
