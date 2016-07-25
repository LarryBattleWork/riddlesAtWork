"use strict";

const Utils = require("./Utils.js").Utils;
const Player = require("./Player.js").Player;

class HumanPlayer extends Player {
    getNextMove(pos) {
        return Utils.getUserInput(`What is ${ this.name }'s next move? `);
    }
}

exports.HumanPlayer = HumanPlayer;