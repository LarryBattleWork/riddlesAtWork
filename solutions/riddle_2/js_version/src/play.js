/**
 * Play 357
 * Uses es6 and nodejs 6.3+
 * @date July 11, 2016
 * @author Larry Battle
 * */
/*jshint esversion: 6 */
"use strict";
var GameBoard_1 = require("./GameBoard");
var Utils_1 = require("./Utils");
var RobotPlayer_1 = require("./RobotPlayer");
var HumanPlayer_1 = require("./HumanPlayer");
// Functions
var logError = function (e) {
    console.log('There was an Error. ' + e);
};
var createUserPlayer = function () {
    return Utils_1.default.getUserInput("What is the name of your player? ").then(function (name) {
        return new HumanPlayer_1.default(name);
    }).catch(logError);
};
var createRobotPlayer = function () {
    return Promise.resolve(new RobotPlayer_1.default('Mr. AI_' + Utils_1.default.rNum(100)));
};
var printIntro = function () {
    console.log("Welcome to 357. Let's play!");
};
var playGame = function (board) {
    //board.printStatus();
    board.getMoveFromCurrentPlayer();
};
var run = function () {
    //printIntro();
    Promise.all([
        //createUserPlayer(),
        createRobotPlayer(),
        createRobotPlayer()
    ]).then(function (players) {
        var board = new GameBoard_1.default(true);
        Utils_1.default.shuffleArray(players).forEach(function (player, i) {
            //console.log(`Player ${ 1 + i }: ${ player.name }`);
            board.addPlayer(player);
        });
        playGame(board);
    }).catch(logError);
};
exports.run = run;
