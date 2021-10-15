import {SlashCommandBuilder} from '@discordjs/builders';
import {CommandInterface} from '../interfaces/command.interface';

export const PingCommand: CommandInterface = {
    data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
    execute: async (interaction) => {
        await interaction.reply('Pong!');
    }
};
