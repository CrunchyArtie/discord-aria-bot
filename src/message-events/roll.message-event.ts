import {MessageEventInterface} from '../interfaces/message-event.interface';
import {DiceRoll} from 'rpg-dice-roller';
import {Log} from '../index';

/**
 * Message event triggered to roll dices with {@link https://greenimp.github.io/rpg-dice-roller/ | rpg-dice-roller}
 */
export const RollMessageEvent: MessageEventInterface = {
    key: 'roll',
    alias: ['r'],
    description: 'Jette les dés (voir https://greenimp.github.io/rpg-dice-roller/guide/notation/). Par défaut, 1d100 est jeté.',
    execute: async (message) => {
        Log.debug(`roll message from ${message.author.tag} : ${message.content}`);

        const commandLength = message.content.split(' ')[0].length;
        let rollCommand = message.content.substr(commandLength).trim();
        if (!rollCommand)
            rollCommand = '1d100cs<=6cf>=95';

        let result = '';

        try {
            // const diceRoll = new DiceRoll(rollCommand);
            // const output = diceRoll.output;
            // const notation = diceRoll.notation;
            // const total = diceRoll.total;
            //
            // const rolls = output.slice((notation + ': ').length, output.length - (' = ' + total).length)
            //
            // result = `\`${notation}\` => \`${diceRoll.rolls}\` => \`${total}\``
            // result = `\`${notation}\` - \`${rolls}\` - \`${total}\``

            result = `\`${new DiceRoll(rollCommand).output}\``;
        } catch (e) {
            result = `Désolé, je n'ai pas compris ta commande, essaie de voir avec \`!help\` :-).
Voici le détail de l'erreur : \`${(<Error> e).message}\``;
        }

        await message.reply(result)
    }
}
