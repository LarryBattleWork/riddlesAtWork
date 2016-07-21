/**
 * Play 357
 * Uses es6 and nodejs 6.3+
 * WARNING: Sh*t code
 * @date July 11, 2016
 * @author Larry Battle
 * */
"use strict";

class Player {
    constructor(name) {
        this.name = name;
    }

    toString() {
        return `Player: ${this.name}`;
    }

    makeMove(board) {
	throw new Error('Need to be implemented');
    }
}
