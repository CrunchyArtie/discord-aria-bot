import {MessageCreateEvent} from './message-create.event';
import {ReadyEvent} from './ready.event';
import {InteractionCreateEvent} from './interaction-create.event';

export const events = [
    ReadyEvent,
    InteractionCreateEvent,
    MessageCreateEvent
];
