/**
 * Play 357
 * Uses es6 and nodejs 6.3+
 * @date July 11, 2016
 * @author Larry Battle
 * */
/*jshint esversion: 6 */
"use strict";

declare const Promise;

import GameBoard from "./GameBoard";
import Utils from "./Utils";
import RobotPlayer from "./RobotPlayer";
import HumanPlayer from "./HumanPlayer";

// Functions
const logError = function (e) {
    console.log('There was an Error. ' + e);
};
const createUserPlayer = () => {
    return Utils.getUserInput("What is the name of your player? ").then((name : string) => {
        return new HumanPlayer(name);
    }).catch(logError);
};

const createRobotPlayer = () => {
    return Promise.resolve(new RobotPlayer('Mr. AI_' + Utils.rNum(100)));
};

const printIntro = () => {
    console.log("Welcome to 357. Let's play!");
};
const playGame = board => {
    board.printStatus();
    board.getMoveFromCurrentPlayer();
};
const main = () => {
    printIntro();
    Promise.all([
    createUserPlayer(),
    createUserPlayer()
   // createRobotPlayer(), createRobotPlayer()
    ]).then(players => {
        var board = new GameBoard();
        Utils.shuffleArray(players).forEach((player, i) => {
            console.log(`Player ${ 1 + i }: ${ player.name }`);
            board.addPlayer(player);
        });
        playGame(board);
    }).catch(logError);
};
main();
