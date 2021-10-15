// Require the necessary discord.js classes
import {Client, Intents} from 'discord.js';
import {CommandDeployer} from './deploy-command';
import {commands} from './commands';
import {config} from './config';
import {Logger} from 'tslog';
import {InteractionCreateEvent, MessageCreateEvent, ReadyEvent} from './events';
import {EventInterface} from './interfaces/event.interface';

export const Log = new Logger({name: 'Jotun', minLevel: <any>config.LOG_MIN_LEVEL})

Log.silly('Let\'s go !');

const token = config.DISCORD_TOKEN || '';

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});
const commandDeployer = new CommandDeployer(commands);

const events: EventInterface[] = [
    new MessageCreateEvent(),
    new ReadyEvent(),
    new InteractionCreateEvent()
];

events.forEach((event) => {
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
})

commandDeployer.deploy()
    .then(async () => {
        Log.info('Successfully registered application commands.');

        // Login to Discord with your client's token
        await client.login(token);
    })
    .catch((error) => Log.error(error));

