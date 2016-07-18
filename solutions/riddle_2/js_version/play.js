/**
 * Play 357
 * Uses es6 and nodejs 6.3+
 * @date July 11, 2016
 * @author Larry Battle
 * */
"use strict";
const readline = require('readline');

// CLASSES

class GameBoard {
  constructor(){
    this.position = '357';
    this.moves = 0;
  }
  toString(){
    return `The board is at ${this.position}`;
  }
  isValidMove(newPosition){
    .
  }
  makeMove(pos){
    if(this.isValidMove(pos)){
      return false;
    }
    this.moves += 1;
    this.position = pos;
    return true;
  }
}

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
const logError = function(){
  console.error( "Error: " + JSON.stringify(arguments, null, 2) );
};
const createUserPlayer = () => {
    return getUserInput("What is the name of your player? ").then((name) => {
        return new HumanPlayer(name);
    }).catch(logError);
};

const createRobotPlayer = () => {
    return Promise.resolve(new RobotPlayer('Robot'));
};
const createGameBoard = () => {};
const endGame = () => {};

const printIntro = () => {
    console.log("Welcome to 357. Let's play!");
};
const playGame = (board, playerA, playerB) => {
}
const main = () => {
    printIntro();
    // pick player
    const playerAPromise = createUserPlayer();
    const playerB = createRobotPlayer();

    Promise.all([
        playerAPromise, playerB //, board 
    ]).then((players) => {
	const board = new GameBoard();
	playGame( board, players.pop(), players.pop() );
    }).catch(logError);
    //setTimeout(function(){ console.log('Timeout calledout'); }, 1000 * 5);
    /*
  // reset board
  const board = createGameBoard();
  // play game
  const winner = playGame( board, playerA, playerB );
  // alert winner
  endGame( winner );
  console.log( "%s won!" );
  console.log( "Game over" );
	*/
}
main();
