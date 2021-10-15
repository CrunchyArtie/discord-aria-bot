import {MessageEventInterface} from '../interfaces/message-event.interface';
import {messageEvents} from './index';
import {config} from '../config';
import * as _ from 'lodash';
import {Log} from '../index';

const getLine = (me: MessageEventInterface) => {
    let line = me.key;

    if(_.isArray(me.alias)) {
        line += ', ' + me.alias.join(', ');
    }

    if(_.isString(me.description)) {
        line += ' => ' + me.description;
    }

    return line;
}

export const HelpMessageEvent: MessageEventInterface = {
    key: 'help',
    alias: ['h'],
    description: 'Affiche l\'aide.',
    execute: async (message) => {
        Log.debug(`help message from ${message.author.tag}`);
        await message.reply(`Hey, tu peux taper une commande en respectant ce format : ${config.MAGIC_KEY}<commande> [parametres]
            
Voici la liste des commandes:
${ messageEvents.map(me => `    - ${getLine(me)}`).join('\n') }`)
    }
}
