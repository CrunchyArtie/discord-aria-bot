import {SlashCommandBuilder} from '@discordjs/builders';
import {CommandInterface} from '../interfaces/command.interface';

/**
 * Command use for example
 */
export const PingCommand: CommandInterface = {
    data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
    execute: async (interaction) => {
        await interaction.reply('Pong!');
    }
};
