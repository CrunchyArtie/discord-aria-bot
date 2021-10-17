import {DeckActionInterface} from '../interfaces/deck-action.interface';
import {Log} from '../index';
import {Deck} from './deck-management/deck';

/**
 * Action used to List all available cards
 */
export const ListCardDeckAction: DeckActionInterface = {
    command: 'list',
    alias: ['l'],
    description: 'Liste toutes les cartes disponibles.',
    execute: async (options) => {
        Log.trace('List card message', options.command);

        const cardsLabel = Deck.cards.map(c => c.toString()).join(' ')
        // @ts-ignore
        await options.message.reply(`Liste des cartes disponibles: \`[${cardsLabel}]\``);
    }
}
