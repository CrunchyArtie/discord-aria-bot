import {Family} from './family';

/**
 * Playable Card used in deck
 */
export class Card {
    constructor(
        // value of a card, should be used to compare cards
        private readonly value: number,
        // label of card, to an user friendly use
        private readonly label: string,
        // family of card
        private readonly family: Family) {
    }

    /**
     * return a user friendly string to describe the card
     */
    public toString(): string {
        return `${this.label}${this.family.icon}`;
    }
}
