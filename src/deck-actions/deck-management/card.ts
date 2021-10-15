import {Family} from './family';

export class Card {
    constructor(
        private readonly value: number,
        private readonly label: string,
        private readonly family: Family) {
    }

    public toString(): string {
        return `${this.label}${this.family.icon}`;
    }
}
