import {Deck} from '../deck-actions/deck-management/deck';
import {Message} from 'discord.js';

/**
 * Describe a data stuffed object to pass to a {@link DeckActionInterface} when triggered
 */
export interface DeckActionOptionsInterface {
    /**
     * Current used Deck, may be a global or the user deck by example
     */
    deck: Deck;
    /**
     * Message used to trigger the event, usefull for reply
     */
    message: Message,
    /**
     * Message used to trigger the action
     */
    command: string,
    /**
     * Unique identifier used to represent the author of the {@link message}
     */
    userIdentifier: string,
}
