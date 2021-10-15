import {Card} from './card';
import {Family} from './family';
import _ from 'lodash';
import {Log} from '../../index';

const HeartsFamily = new Family('coeur', '♥');
const PikesFamily = new Family('pique', '♠');
const TilesFamily = new Family('carreau', '♦');
const CloversFamily = new Family('trèfle', '♣');

export class Deck {
    public static readonly cards: Card[] = [
        new Card(1, 'Joker', new Family('Joker', '🃏')),
        ...[HeartsFamily, PikesFamily, TilesFamily, CloversFamily]
            .reduce((arr, f) => {
                arr.push(
                    new Card(2, '2', f),
                    new Card(3, '3', f),
                    new Card(4, '4', f),
                    new Card(5, '5', f),
                    new Card(6, '6', f),
                    new Card(7, '7', f),
                    new Card(8, '8', f),
                    new Card(9, '9', f),
                    new Card(10, '10', f),
                    new Card(11, 'Valet', f),
                    new Card(12, 'Dame', f),
                    new Card(13, 'Roi', f),
                    new Card(1, 'As', f)
                );
                return arr;
            }, <Card[]>[])
    ]

    /**
     * Get number of cards in the deck
     */
    public get length(): number {
        return this.cards.length;
    }

    constructor(cardsAllowed?: string[] | 'all') {
        Log.trace('deck::constructor::42', cardsAllowed);
        this.cards = Deck.cards.slice();

        if (!!cardsAllowed && _.isArray(cardsAllowed)) {
            this.cards = cardsAllowed.map(ca => <Card> this.cards.find(c => ca === (c.toString())));
        }
    }

    private cards: Card[] = [];

    /**
     * Shuffle the current card order;
     */
    public shuffle(): Deck {
        Log.trace('deck::shuffle::55');
        this.cards = _.shuffle(this.cards)
        return this;
    }

    /**
     * Get a new Array filled with the deck cards
     */
    public getCards(): Card[] {
        Log.trace('deck::getCards::64');
        return this.cards.slice();
    }

    /**
     * remove cards to the deck and return this cards
     * @param howMany number of deck cards
     */
    public pickCards(howMany: number) {
        Log.trace('deck::pickCards::73', howMany);
        const result = [];
        // @ts-ignore
        const limit: number = _.min([howMany, this.cards.length])
        for (let i = 0; i < limit; i++) {
            result.push(this.cards.shift())
        }
        return result;
    }

    /**
     * User friendly list of all cards
     */
    public toString(): string {
        return `[${this.cards.map(c => c.toString()).join(', ')}]`;
    }
}
