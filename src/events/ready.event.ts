import {EventInterface} from '../interfaces/event.interface';
import {Log} from '../index';

export const ReadyEvent: EventInterface = {
    execute: async (client) => {
        Log.info(`Ready! Logged in as ${client.user.tag}`);
    },
    name: 'ready',
    once: true
}
