/**
 * Play 357
 * Uses es6 and nodejs 6.3+
 * WARNING: Sh*t code
 * @date July 11, 2016
 * @author Larry Battle
 * */
"use strict";
const readline = require('readline');
const gameStats = require("./gameStat.js");
const isValidMove = gameStats.isValidMove;
const gameGraph = gameStats.createGameGraph();

// Utils
const rArr = (arr) => {
  return arr[Math.floor(arr.length*Math.random())];
}


// CLASSES

class GameBoard {
  constructor(){
    this.reset();
  }
  toString(){
    return `The board is at ${this.position}`;
  }
  isValidMove(newPosition){
    return isValidMove(this.position, newPosition);
  }
  reset(){
    this.players = [];
    this.playerIndex = 0;
    this.position = '357';
    this.turns = 0;
  }
  incrementPlayerIndex(){
    this.playerIndex = (1 + this.playerIndex ) % this.players.length;
  }
  getPosition(){
    return this.position;
  }
  addPlayer(player){
    this.players.push( player ); 
  }
  moveToPosition(pos){
    if(!this.isValidMove(pos)){
      throw new Error('Error: Invalid move ${pos}');
    }
    this.turns += 1;
    this.position = pos;
    this.incrementPlayerIndex();
  }
  getPlayer(){
  //  console.log( "players => ", JSON.stringify(this.players, null, 2) );
  //  console.log( "playerIndex => ", this.playerIndex );
    return this.players[this.playerIndex];
  }
  isGameOver(){
    if(10 < this.turns){
    	throw new Error( "BUG: Too many turns, ${this.turns}" );
    }
    return (/001|010|100/).test(this.position);
  }
  printStatus(){
    console.log( this.toString() );
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
class RobotPlayer extends Player{
    getNextMove(pos){
	var p = gameGraph.find( n => n.position === pos )
	if(!p){
	  throw new Error(`${pos} is an invalid MOVE!!??`);
	}
	var m = rArr(p.moves);
	if(!m){
	  throw new Error(`There were no moves found for ${pos}.`);
	}
	return Promise.resolve(m);
    }
}
class HumanPlayer extends Player{
    getNextMove(pos){
      return getUserInput(`What position after "${pos}"?`);
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
const playGame = (board) => {
  console.log("Playing game");
  while(!board.isGameOver()){
   board.printStatus();
   console.log("Getting next player");
   const p = board.getPlayer();
   console.log("Got player: ", p);

   !! Returns a promise
   const newPosition = p.getNextMove( board.getPosition() ).then(move => next(move));
   console.log("The player choiced to move to ", newPosition);
   board.moveToPosition( newPosition );
   console.log("Moved to that position");
  }
  console.log("Game complete");
}
const main = () => {
    printIntro();
    // pick player
    const playerAPromise = createUserPlayer();
    const playerB = createRobotPlayer();

    console.log("Waiting on robot and user creation");
    Promise.all([
        playerAPromise, playerB //, board 
    ]).then((players) => {
	console.log("Creating gameboard");
	var board = new GameBoard();
	var playerA = players.pop();
	var playerB = players.pop();
	console.log( "playerA => ", playerA );
	console.log( "playerB => ", playerB );
	board.addPlayer( playerA );
	board.addPlayer( playerB );
	console.log( "board.players => ", board.players );
	playGame( board );
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
