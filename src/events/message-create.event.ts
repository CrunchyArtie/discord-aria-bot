import {EventInterface} from '../interfaces/event.interface';
import {Message} from 'discord.js';
import {messageEvents} from '../message-events';
import {config} from '../config';
import {HelpMessageEvent} from '../message-events/help.message-event';
import {Log} from '../index';

export const MessageCreateEvent: EventInterface = {
    name: 'messageCreate',
    execute: async (message: Message) => {
        if (message.author.bot) return

        const content = message.content.split(' ')[0];

        if (content.startsWith(config.MAGIC_KEY)) {
            const messageEvent = messageEvents.find(me =>
                content === (config.MAGIC_KEY + me.key)
                || (me.alias && me.alias.some(a => content === config.MAGIC_KEY + a))
            )

            if (messageEvent) {
                await messageEvent.execute(message);
            } else {
                const maxLength = 20
                const preview = content.slice(0, maxLength);
                const tail = content.length > maxLength ? '...' : '';
                Log.info(`not found message from ${message.author.tag} : ${preview}${tail}`);

                await message.reply(`Je ne trouve pas cette commande, essaie avec ${config.MAGIC_KEY}${HelpMessageEvent.key}`);
            }
        }
    }
}
