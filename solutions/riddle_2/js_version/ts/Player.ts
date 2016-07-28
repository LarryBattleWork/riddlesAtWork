"use strict";

export default class Player {
    
    name: string

    constructor(name) {
        this.name = name;
    }

    toString() {
        return `Player: ${ this.name }`;
    }
}