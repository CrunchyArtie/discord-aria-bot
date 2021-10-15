import {Client} from 'discord.js';

export interface EventInterface {
    name: string,
    once?: boolean,
    execute: (...interactObject: any) => Promise<void>;
}
