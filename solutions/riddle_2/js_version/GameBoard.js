/**
 * Play 357
 * Uses es6 and nodejs 6.3+
 * WARNING: Sh*t code
 * @date July 11, 2016
 * @author Larry Battle
 * */
"use strict";
const gameStats = require("./gameStat.js");
const isValidMove = gameStats.isValidMove;
const gameGraph = gameStats.createGameGraph();

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
  makeMove(pos){
    if(this.isValidMove(pos)){
      return false;
    }
    this.moves += 1;
    this.position = pos;
    return true;
  }
  reset(){
    this.players = [];
    this.playerIndex = 0;
    this.position = '357';
    this.moves = 0;
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
      console.log('Error: Invalid move');
      return false;
    }
    this.position = pos;
    this.incrementPlayerIndex();
    return true;
  }
  getPlayer(){
    return this.players[this.playerIndex];
  }
  isGameOver(){
    return (/001|010|100/).test(this.position);
  }
  printStatus(){
    console.log( this.toString() );
  }
}

