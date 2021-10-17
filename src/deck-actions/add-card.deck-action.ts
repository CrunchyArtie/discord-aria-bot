import {DeckActionInterface} from '../interfaces/deck-action.interface';
import {DeckManager} from './deck-management/deck-manager';
import {Log} from '../index';
import {Deck} from './deck-management/deck';

/**
 * Action used to add a carte in the deck
 */
export const AddCardDeckAction: DeckActionInterface = {
    command: 'add',
    alias: ['a'],
    description: 'Ajoute une carte ou plus sur le dessus du deck',
    execute: async (options) => {
        Log.trace('add card message', options.command);
        Log.debug('add card message', options.command);
        const cardsToPush = options.command.split(' ').map(c => c.replace(',', '').trim());

        const relatedCard = cardsToPush.map(cp => ({ user: cp, card: Deck.cards.find(c => c.toString() === cp)}));

        const notFound = relatedCard.filter((c) => !c.card);

        if(notFound.length > 0) {
            await options.message.reply(`On annule, je n'ai pas trouvé ces cartes : \n- ${notFound.map(c => c.user).join('\n- ')}`);
            return;
        }

        // @ts-ignore
        options.deck.addCards(relatedCard.map(c => c.card));
        await DeckManager.getInstance().save(options.deck, options.userIdentifier);
        await options.message.reply(`Ajout de ${relatedCard.length} carte${relatedCard.length > 0 ? 's':''} sur le dessus du deck.`);
    }
}
