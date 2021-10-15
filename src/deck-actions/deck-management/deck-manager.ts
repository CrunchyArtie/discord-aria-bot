import {Deck} from './deck';
import {db} from '../../firebase';
import {doc, getDoc, setDoc} from 'firebase/firestore/lite';
import {Log} from '../../index';

const collection = 'decks';

/**
 * Singleton used to manage a deck instance
 */
export class DeckManager {

    private static instance: DeckManager;

    public static getInstance(): DeckManager {
        if (!DeckManager.instance) {
            DeckManager.instance = new DeckManager();
        }

        return DeckManager.instance;
    }

    private constructor() {
    }

    /**
     * Save a deck in the database
     * @param deck
     * @param identifier used as a unique key to reference the deck (to find it by example)
     */
    public async save(deck: Deck, identifier: string): Promise<void> {
        Log.trace('deck-manager::save::26', identifier);
        try {
            const stringCards = deck.getCards().map(c => c.toString());
            await setDoc(doc(db, collection, identifier), {cards: stringCards});
        } catch (e) {
            Log.error(e);
            throw new Error(`Incapable de sauvegarder le deck`);
        }
    }

    /**
     * Return the user deck
     * @param identifier user's deck identifier
     * @param orNew if there are no deck, create a new shuffled deck
     */
    public async getDeck(identifier: string, orNew = true): Promise<Deck | null> {
        Log.trace('deck-manager::getDeck::36', identifier);

        try {
            const docRef = doc(db, collection, identifier);
            Log.debug('et ici ?');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                Log.debug('deck-manager::getDeck::49', 'deck exist');
                let doc = <{ cards: string[] }>docSnap.data();
                return new Deck(doc.cards);
            } else if (orNew) {
                Log.debug('deck-manager::getDeck::49', 'deck not exist but we create a new deck');
                return this.newDeck().shuffle()
            }

            Log.debug('deck-manager::getDeck::49', 'deck not exist');
            return null;
        } catch (e) {
            Log.error(e);
            throw new Error(`Incapable de charger le deck`);
        }
    }

    /**
     * Return a new Deck, not shuffled with all cards
     */
    public newDeck(): Deck {
        Log.trace('deck-manager::newDeck::52');
        return new Deck();
    }
}
