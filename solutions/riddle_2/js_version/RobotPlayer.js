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

class RobotPlayer extends Player{
    getNextMove(pos){
	var p = gameGraph.find( n => n.position === pos )
	if(!p){
	  throw new Error(`${pos} is an invalid MOVE!!??`);
	}
	var m = p.moves[0];
	if(!m){
	  throw new Error(`There were no moves found for ${pos}.`);
	}
	return Promise.resolve(m);
    }
}
