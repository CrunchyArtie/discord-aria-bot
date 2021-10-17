import {MessageEventInterface} from '../interfaces/message-event.interface';
import {DeckActions} from '../deck-actions';
import * as _ from 'lodash';
import {DeckActionInterface} from '../interfaces/deck-action.interface';
import {DeckManager} from '../deck-actions/deck-management/deck-manager';
import {Log} from '../index';

function getLine(me: DeckActionInterface) {
    const parent = _.isArray(DeckMessageEvent.alias) && DeckMessageEvent.alias.length > 0 ? `[${[DeckMessageEvent.key, ...DeckMessageEvent.alias].join('|')}]` : `!${DeckMessageEvent.key}`;
    const action = _.isArray(me.alias) && me.alias.length > 0 ? `[${[me.command, ...me.alias].join('|')}]` : `!${me.command}`;
    let line = `!\`${parent}\` \`${action}\``;

    if (_.isString(me.description)) {
        line += ' => ' + me.description;
    }

    return line;
}

/**
 *  Message event triggered to manipulate a {@link Deck}
 */
export const DeckMessageEvent: MessageEventInterface = {
    key: 'deck',
    alias: ['d'],
    description: 'Manipule un deck de carte.',
    execute: async (message) => {
        Log.debug(`deck message from ${message.author.tag} : ${message.content}`);

        const commandLength = message.content.split(' ')[0].length;
        let deckCommand = message.content.substr(commandLength).trim();

        if (!deckCommand) {
            await message.reply(`Attends là, tu veux faire quoi ?
Voici la liste des commandes:
${DeckActions.map(me => `    - ${getLine(me)}`).join('\n')}`);
            return;
        } else {
            const deckActionCommand = deckCommand.split(' ')[0]

            const action = DeckActions.find(deckAction =>
                deckActionCommand === (deckAction.command)
                || (deckAction.alias && deckAction.alias.some(a => deckActionCommand === a))
            )

            if (!action) {
                await message.reply(`Attends là, tu veux faire quoi ?
Voici la liste des commandes:
${DeckActions.map(me => `    - ${getLine(me)}`).join('\n')}`);
                return;
            } else {
                try {
                    const command = deckCommand.substr(deckActionCommand.length).trim();
                    const userIdentifier = `${message.guildId}/${message.channelId}/${message.author.id}`;
                    const deck = await DeckManager.getInstance().getDeck(userIdentifier);

                    if (deck) {
                        await action.execute({
                            command,
                            message,
                            deck,
                            userIdentifier
                        })
                    }
                } catch (e) {
                    await message.reply(`Désolé, je n'ai pas compris ta commande, essaie de voir avec \`!help\` :-).
Voici le détail de l'erreur : \`${(<Error>e).message}\``);
                }
            }
        }

    }
}
