/**
* @date July 22, 2016
* @author Larry Battle
* */
/*jshint esversion: 6 */
"use strict";
var gameStat_1 = require('./gameStat');
var gameGraph = gameStat_1.createGameGraph();
var GameBoard = (function () {
    function GameBoard() {
        this.moves = [];
        this.players = [];
        this.playerIndex = 0;
        this.position = '357';
        this.reset();
    }
    GameBoard.prototype.toString = function () {
        return "The board is at " + this.position;
    };
    GameBoard.prototype.reset = function () {
        this.moves = [];
        this.players = [];
        this.playerIndex = 0;
        this.position = '357';
    };
    GameBoard.prototype.addPlayer = function (player) {
        this.players.push(player);
    };
    Object.defineProperty(GameBoard.prototype, "player", {
        get: function () {
            return this.players[this.playerIndex];
        },
        enumerable: true,
        configurable: true
    });
    GameBoard.prototype.incrementPlayerIndex = function () {
        this.playerIndex = (1 + this.playerIndex) % this.players.length;
    };
    Object.defineProperty(GameBoard.prototype, "turns", {
        get: function () {
            return this.moves.length;
        },
        enumerable: true,
        configurable: true
    });
    GameBoard.prototype.isValidMove = function (newPosition) {
        return gameStat_1.isValidMove(this.position, newPosition);
    };
    GameBoard.prototype.getPosition = function () {
        return this.position;
    };
    GameBoard.prototype.moveToPosition = function (pos) {
        if (!this.isValidMove(pos)) {
            throw new Error((pos || '').substring(0, 3) + " is not a valid move.");
        }
        this.moves.push(pos);
        this.position = pos;
        this.incrementPlayerIndex();
    };
    GameBoard.prototype.processPlayersMove = function (move) {
        try {
            this.moveToPosition(move);
            console.log("+ Action " + this.turns + ") Moved to " + move + " - " + this.player.name + ".");
        }
        catch (e) {
            console.error("- " + e);
        }
        if (this.isGameOver()) {
            this.endGame();
        }
        else {
            this.getMoveFromCurrentPlayer();
        }
    };
    GameBoard.prototype.getMoveFromCurrentPlayer = function () {
        this.player.getNextMove(this.getPosition()).then(this.processPlayersMove.bind(this));
    };
    GameBoard.prototype.endGame = function () {
        console.log(this.player.name + " lost the game in " + this.turns + " turns.");
        console.log('Game Over.');
    };
    GameBoard.prototype.isGameOver = function () {
        if (20 < this.turns) {
            throw new Error("Too many turns, ${this.turns}");
        }
        return (/001|010|100/.test(this.position));
    };
    GameBoard.prototype.printStatus = function () {
        console.log(this.toString());
    };
    return GameBoard;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GameBoard;
