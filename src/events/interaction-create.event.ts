import {EventInterface} from '../interfaces/event.interface';
import {commands} from '../commands';
import {Log} from '../index';

export const InteractionCreateEvent: EventInterface = {
    name: 'interactionCreate',
    execute:     async (interaction) => {
        Log.trace(`${interaction.user.tag} in #${interaction.channel?.name} triggered an interaction.`);

        if (!interaction.isCommand()) return;

        const command = commands.find(c => c.data.name === interaction.commandName)

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            Log.error(error);
            await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
        }
    },
}
