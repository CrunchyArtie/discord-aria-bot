import {REST} from '@discordjs/rest';
import {Routes} from 'discord-api-types/v9';
import {config} from './config';
import {CommandInterface} from './interfaces/command.interface';

export class CommandDeployer {
    private rest = new REST({version: '9'}).setToken(config.DISCORD_TOKEN);

    constructor(public commands: CommandInterface[] = []) {
    }

    deploy(): Promise<unknown> {
        const data = {body: this.commands.map(c => c.data)}
        return this.rest.put(Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, config.DISCORD_GUILD_ID), data)
    }
}
