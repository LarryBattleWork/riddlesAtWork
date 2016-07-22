/**
 * Play 357
 * Uses es6 and nodejs 6.3+
 * @date July 11, 2016
 * @author Larry Battle
 * */
/*jshint esversion: 6 */
(function() {
    "use strict";
    const readline = require('readline');
    const gameStats = require("./gameStat.js");
    const isValidMove = gameStats.isValidMove;
    const gameGraph = gameStats.createGameGraph();

    // Utils
    const rNum = (l) => {
        return Math.floor(Math.random() * l);
    }
    const rArr = (arr) => {
        return arr[rNum(arr.length)];
    }
    const shuffleArray = (arr) => {
        return arr.sort(_ => 0.5 - Math.random());
    }

    // CLASSES
    class GameBoard {
        constructor() {
            this.reset();
        }
        toString() {
            return `The board is at ${this.position}`;
        }
        reset() {
            this.players = [];
            this.playerIndex = 0;
            this.position = '357';
            this.turns = 0;
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

        isValidMove(newPosition) {
            return isValidMove(this.position, newPosition);
        }
        getPosition() {
            return this.position;
        }
        moveToPosition(pos) {
            if (!this.isValidMove(pos)) {
                throw new Error(`${pos} is not a valid move.`);
            }
            this.turns += 1;
            this.position = pos;
            this.incrementPlayerIndex();
        }
        getMoveFromCurrentPlayer() {
            const p = this.player;
            var self = this;
            p.getNextMove(this.getPosition()).then(move => {
                try {
                    self.moveToPosition(move);
                    console.log(`+ Step ${self.turns}) Moved to ${move} - ${p.name}.`);
                } catch (e) {
                    console.error(`- ${e}`);
                }
                if (self.isGameOver()) {
                    self.endGame();
                } else {
                    self.getMoveFromCurrentPlayer();
                }
            });
        }

        endGame() {
            console.log(`${this.player.name} lost the game in ${this.turns} turns.`);
            console.log('Game Over.');
        }

        isGameOver() {
            if (20 < this.turns) {
                throw new Error("Too many turns, ${this.turns}");
            }
            return (/001|010|100/).test(this.position);
        }
        printStatus() {
            console.log(this.toString());
        }
    }

    class Player {
        constructor(name) {
            this.name = name;
        }

        toString() {
            return `Player: ${this.name}`;
        }
    }
    class RobotPlayer extends Player {
        getNextMove(pos) {
            var p = gameGraph.find(n => n.position === pos);
            if (!p) {
                console.error(`Error: ${pos} is an invalid MOVE!!??`);
                throw new Error('Oh no.');
            }
            var m = rArr(p.moves);
            if (!m) {
                console.error(`There were no moves found for ${pos}.`);
                throw new Error("Oh no");
            }
            return Promise.resolve(m);
        }
    }
    class HumanPlayer extends Player {
        getNextMove(pos) {
            return getUserInput(`What is ${this.name}'s next move? `);
        }
    }

    // Functions
    const getUserInput = msg => {
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
    const logError = function(e) {
        console.log('There was an Error. ' + e);
    };
    const createUserPlayer = () => {
        return getUserInput("What is the name of your player? ").then((name) => {
            return new HumanPlayer(name);
        }).catch(logError);
    };

    const createRobotPlayer = () => {
        return Promise.resolve(new RobotPlayer('Mr. AI_' + rNum(100)));
    };

    const printIntro = () => {
        console.log("Welcome to 357. Let's play!");
    };
    const playGame = (board) => {
        board.printStatus();
        board.getMoveFromCurrentPlayer();
    }
    const main = () => {
        printIntro();
        Promise.all([
            //createUserPlayer(),
            createRobotPlayer(),
            createRobotPlayer()
        ]).then(players => {
            var board = new GameBoard();
            shuffleArray(players).forEach((player, i) => {
                console.log(`Player ${1+i}: ${player.name}`);
                board.addPlayer(player);
            })
            playGame(board);
        }).catch(logError);
    }
    main();
}());
