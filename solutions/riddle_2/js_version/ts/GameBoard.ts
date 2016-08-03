/**
* @date July 22, 2016
* @author Larry Battle
* */
/*jshint esversion: 6 */
"use strict";

import readline = require('readline');
import {isValidMove, createGameGraph} from './gameStat';

const gameGraph = createGameGraph();

export default class GameBoard {
    initPosition = '357'
    moves = [];
    players = [];
    playerIndex = 0;
    position = '';

    constructor(public onlyShowMoves:boolean = false) {
        this.reset();
    }
    toString() {
        return `The board is at ${ this.position }`;
    }
    reset() {
        this.players = [];
        this.playerIndex = 0;
        this.position = this.initPosition.toString();
        this.moves = [this.position];
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
        return this.moves.length - 1;
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
            if( !this.onlyShowMoves ){
                console.log(`+ Action ${ this.turns }) Moved to ${ move } - ${ this.player.name }.`);
            }
        } catch (e) {
            if( !this.onlyShowMoves ){
                console.error(`- ${ e }`);
            }
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
        if( this.onlyShowMoves ){
            const o = {
                date: new Date(),
                moves : this.moves,
                turns : this.turns
            //    lost: this.player.name
            }
            console.log(JSON.stringify(o));
        }else{
            console.log(`${ this.player.name } lost the game in ${ this.turns } turns.`);
            console.log('Game Over.');
        }
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