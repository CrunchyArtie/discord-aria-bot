import {DeckActionOptionsInterface} from './deck-action-options.interface';

/**
 * Describe an action to apply on a {@link Deck}
 */
export interface DeckActionInterface {
    /**
     * String used to identify the action
     */
    command: string;
    /**
     * Aliases used same as {@link command}
     */
    alias?: string[];
    /**
     * Explain the action, used to generate the help action
     */
    description?: string;
    /**
     * Called function when the action is triggered
     * @param options
     */
    execute: (options: DeckActionOptionsInterface) => Promise<void>;
}
