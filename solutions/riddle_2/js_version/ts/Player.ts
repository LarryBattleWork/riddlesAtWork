"use strict";

class Player {
    constructor(name) {
        this.name = name;
    }

    toString() {
        return `Player: ${ this.name }`;
    }
}

exports.Player = Player;