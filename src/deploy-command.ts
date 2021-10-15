import {REST} from '@discordjs/rest';
import {Routes} from 'discord-api-types/v9';
import {config} from './config';
import {CommandInterface} from './interfaces/command.interface';

/**
 * The CommandDeployer is able to push a list of command to discord.
 * Without pushing a command to discord, your will not be able to use it in your channels
 */
export class CommandDeployer {
    private rest = new REST({version: '9'}).setToken(config.DISCORD_TOKEN);

    /**
     * @param commands List of command to deploy
     */
    constructor(public commands: CommandInterface[] = []) {
    }

    /**
     * Send the given commands to discord {@link CommandDeployer.commands}
     */
    deploy(): Promise<unknown> {
        const data = {body: this.commands.map(c => c.data)}
        return this.rest.put(Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, config.DISCORD_GUILD_ID), data)
    }
}
