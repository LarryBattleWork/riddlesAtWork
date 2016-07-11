/**
 * Play 357
 * Uses es6 and nodejs 6.3+
 * @date July 11, 2016
 * @author Larry Battle
 * */
"use strict";
var readline = require('readline');

// CLASSES
class Player {
    constructor(name) {
        this.name = name;
    }
    toString() {
        return "Player: " + this.name;
    }
    makeMove(board) {
	throw new Error('Need to be implemented');
    }
}
class RobotPlayer extends Player{
    makeMove(board) {
	throw new Error('Need to be implemented');
    }
}
class HumanPlayer extends Player{
    makeMove(board) {
	throw new Error('Need to be implemented');
    }
}

// Functions
var getUserInput = (msg) => {
    return new Promise((resolve, reject) => {
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(msg, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
};
var createUserPlayer = () => {
    return getUserInput("What is the name of your player? ").then((name) => {
        return new HumanPlayer(name);
    });
};

var createRobotPlayer = () => {
    return Promise.resolve(new RobotPlayer('Robot'));
};
var createGameBoard = () => {};
var endGame = () => {};

var printIntro = () => {
    console.log("Welcome to 357. Let's play!");
};
var main = () => {
    printIntro();
    // pick player
    var playerAPromise = createUserPlayer();
    var playerB = createRobotPlayer();

    Promise.all([
        playerAPromise, playerB //, board 
    ]).then((values) => {
        console.log('Yo. Player A => %s~', values[0].toString());
        console.log('Yo. Player B => %s~', values[1].toString());
    }).catch((err) => {
        console.log('Error:' + err);
    });
    //setTimeout(function(){ console.log('Timeout calledout'); }, 1000 * 5);
    /*
  // reset board
  var board = createGameBoard();
  // play game
  var winner = playGame( board, playerA, playerB );
  // alert winner
  endGame( winner );
  console.log( "%s won!" );
  console.log( "Game over" );
	*/
}
main();
