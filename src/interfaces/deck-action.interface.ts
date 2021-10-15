import {Message} from 'discord.js';
import {Deck} from '../deck-actions/deck-management/deck';

export interface DeckActionOptionsInterface {
    deck: Deck;
    message: Message,
    command: string,
    userIdentifier: string,
}

export interface DeckActionInterface {
    command: string;
    alias?: string[];
    description?: string;
    execute: (options: DeckActionOptionsInterface) => Promise<void>;
}
