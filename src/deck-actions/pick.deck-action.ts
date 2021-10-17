import {DeckActionInterface} from '../interfaces/deck-action.interface';
import _ from 'lodash';
import * as math from 'mathjs';
import {DeckManager} from './deck-management/deck-manager';
import {Log} from '../index';

/**
 * Action used to pick a number of cards in the given deck
 */
export const PickDeckAction: DeckActionInterface = {
    command: 'pick',
    alias: ['p'],
    description: 'Pour piocher une carte',
    execute: async (options) => {
        Log.debug('pick message', options.command);

        let howManyAsString = options.command.split(' ')[0].trim();
        if (howManyAsString.length === 0) howManyAsString = '1';

        let howMany: number;
        try {
            howMany = math.evaluate(howManyAsString);
            if (!_.isNumber(howMany) || !_.isFinite(howMany)) throw new Error('c\'est pas un nombre');
        } catch (e) {
            Log.error(e);
            throw new Error(`Hola ! Ce n'est pas un nombre acceptable ça !`);
        }

        if (howMany < 1) throw new Error(`Au moins une carte s'il te plait`);

        const cards = options.deck.pickCards(howMany);
        await DeckManager.getInstance().save(options.deck, options.userIdentifier);

        const response = cards.length <= 0 ? 'Plus de cartes :(' : `\`${cards.join(', ')}\``

        await options.message.reply(`${response}`);
    }
}
