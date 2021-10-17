import {DeckActionInterface} from '../interfaces/deck-action.interface';
import {DeckManager} from './deck-management/deck-manager';
import {Log} from '../index';

/**
 * Action used to add a carte in the deck
 */
export const ShuffleDeckAction: DeckActionInterface = {
    command: 'shuffle',
    alias: ['s'],
    description: 'Melange le deck',
    execute: async (options) => {
        Log.trace('shuffle message', options.command);
        options.deck.shuffle();
        await DeckManager.getInstance().save(options.deck, options.userIdentifier);
        await options.message.reply(`Deck mélangé !`);
    }
}
