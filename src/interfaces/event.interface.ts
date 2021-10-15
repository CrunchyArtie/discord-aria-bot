import {ClientEvents} from 'discord.js';

/**
 * Defined the format of the event listening by the bot
 */
export interface EventInterface<T extends keyof ClientEvents = any> {
    /**
     * Name of the event, must be a value of discord.js {@link ClientEvents https://discord.js.org/#/docs/main/stable/class/Client | ClientEvents }
     */
    name: T
    /**
     * If true, the event will be fired once
     * @optional
     * @default false
     */
    once?: boolean
    /**
     * Execution process to be launch when the event is triggered
     * @param args values associated of the event triggered. Values has to be the associated of {@link name}
     */
    execute: (...args: ClientEvents[T]) => Promise<void>;
}
