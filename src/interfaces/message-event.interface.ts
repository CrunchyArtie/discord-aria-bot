import {Message} from 'discord.js';

/**
 * Each `MessageCreate` event from the bot should be executed by an object of this interface
 */
export interface MessageEventInterface {
    /**
     * Key to trigger this event and not another
     */
    key: string,
    /**
     * Aliases to replace the {@link key}
     */
    alias?: string[]
    /**
     * Description of the event reaction, used to generate the help
     */
    description?: string;
    /**
     * Method executed as a reaction of the message if the message trigger this instance {@link key}
     * @param message
     */
    execute: (message: Message) => Promise<void>
}
