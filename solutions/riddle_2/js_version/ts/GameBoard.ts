/**
* @date July 22, 2016
* @author Larry Battle
* */
/*jshint esversion: 6 */
"use strict";

import readline = require('readline');
import {isValidMove, gameStats} = require("./gameStat.ts");
const gameGraph = gameStats.createGameGraph();

class GameBoard {
    constructor() {
        this.reset();
    }
    toString() {
        return `The board is at ${ this.position }`;
    }
    reset() {
        this.moves = [];
        this.players = [];
        this.playerIndex = 0;
        this.position = '357';
    }

    addPlayer(player) {
        this.players.push(player);
    }
    get player() {
        return this.players[this.playerIndex];
    }
    incrementPlayerIndex() {
        this.playerIndex = (1 + this.playerIndex) % this.players.length;
    }

    get turns() {
        return this.moves.length;
    }
    isValidMove(newPosition) {
        return isValidMove(this.position, newPosition);
    }
    getPosition() {
        return this.position;
    }
    moveToPosition(pos) {
        if (!this.isValidMove(pos)) {
            throw new Error(`${ (pos||'').substring(0,3) } is not a valid move.`);
        }
        this.moves.push(pos);
        this.position = pos;
        this.incrementPlayerIndex();
    }
    processPlayersMove(move) {
        try {
            this.moveToPosition(move);
            console.log(`+ Action ${ this.turns }) Moved to ${ move } - ${ this.player.name }.`);
        } catch (e) {
            console.error(`- ${ e }`);
        }
        if (this.isGameOver()) {
            this.endGame();
        } else {
            this.getMoveFromCurrentPlayer();
        }
    }
    getMoveFromCurrentPlayer() {
        this.player.getNextMove(this.getPosition()).then(this.processPlayersMove.bind(this));
    }

    endGame() {
        console.log(`${ this.player.name } lost the game in ${ this.turns } turns.`);
        console.log('Game Over.');
    }

    isGameOver() {
        if (20 < this.turns) {
            throw new Error("Too many turns, ${this.turns}");
        }
        return (/001|010|100/.test(this.position));
    }
    printStatus() {
        console.log(this.toString());
    }
}
exports.GameBoard = GameBoard;
