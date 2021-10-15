import {MessageEventInterface} from '../interfaces/message-event.interface';
import {Log} from '../index';

export const PongMessageEvent: MessageEventInterface = {
    key: 'ping',
    alias: ['p'],
    description: 'Retourne pong.',
    execute: async (message) => {
        Log.debug(`ping message from ${message.author.tag}`);
        await message.reply('pong !')
    }
}
