import {EventInterface} from '../interfaces/event.interface';
import {Log} from '../index';

export class ReadyEvent implements EventInterface<'ready'> {
    public name = 'ready' as const;
    public once = true

    public async execute(interactObject: any): Promise<void | undefined> {
        Log.info(`Ready! Logged in as ${interactObject.user.tag}`);
    }
}
