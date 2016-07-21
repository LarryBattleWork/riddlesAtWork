/**
 * Play 357
 * Uses es6 and nodejs 6.3+
 * WARNING: Sh*t code
 * @date July 11, 2016
 * @author Larry Battle
 * */
"use strict";
const readline = require('readline');

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
class HumanPlayer extends Player{
    getNextMove(pos){
      return this.getUserInput(`What position after "${pos}"?`);
    }
    getUserInput(msg) {
      return new Promise((resolve, reject) => {
		const rl = readline.createInterface({
		    input: process.stdin,
		    output: process.stdout
		});
		rl.question(msg, (answer) => {
		    rl.close();
		    resolve(answer);
		});
	    });
	};
}

