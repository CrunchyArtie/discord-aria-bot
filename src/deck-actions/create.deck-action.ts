import {DeckActionInterface} from '../interfaces/deck-action.interface';
import _ from 'lodash';
import * as math from 'mathjs';
import {DeckManager} from './deck-management/deck-manager';
import {Log} from '../index';

export const CreateDeckAction: DeckActionInterface = {
    command: 'create',
    alias: ['c'],
    description: 'Créé ou écrase un deck avec un nombre limité de carte si défini',
    execute: async (options) => {
        Log.trace('create message', options.command);
        const newDeck = DeckManager.getInstance().newDeck().shuffle();

        let howManyAsString = options.command.split(' ')[0].trim();
        let howMany: number;
        if (howManyAsString.length > 0) {
            try {
                howMany = math.evaluate(howManyAsString);
                if (!_.isNumber(howMany) || !_.isFinite(howMany)) throw new Error('c\'est pas un nombre');
            } catch (e) {
                Log.error(e);
                throw new Error(`Hola ! Ce n'est pas un nombre acceptable ça !`);
            }
            if (howMany < 1) throw new Error(`Avec un chiffre positif s'il te plait`);

            newDeck.pickCards(newDeck.length - howMany);
        }

        await DeckManager.getInstance().save(newDeck, options.userIdentifier);
        await options.message.reply(`Nouveau deck de ${newDeck.length} carte${newDeck.length > 0 ? 's':''} créé.`);
    }
}
