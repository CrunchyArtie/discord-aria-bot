import {SlashCommandBuilder} from '@discordjs/builders';
import {CommandInteraction} from 'discord.js';

/**
 * Defined each class used to describe a {@link https://discord.js.org/#/docs/main/stable/class/CommandInteraction | command}.
 */
export interface CommandInterface {
    /**
     * Use by discord to describe and identify the command
     */
    data: SlashCommandBuilder
    /**
     * Process to execute when command is triggered
     * @param interaction
     */
    execute: (interaction: CommandInteraction) => Promise<void>;
}
