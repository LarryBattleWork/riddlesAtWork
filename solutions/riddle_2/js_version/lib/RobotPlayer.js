"use strict";

const Utils = require("./Utils.js").Utils;
const gameGraph = require("./gameStat.js").createGameGraph();
const Player = require("./Player.js").Player;

class RobotPlayer extends Player {
   getNextMove(pos) {
      var p = gameGraph.find(n => n.position === pos);
      if (!p) {
         console.error(`Error: ${ pos } is an invalid MOVE!!??`);
         throw new Error('Oh no.');
      }
      var m = Utils.rArr(p.moves);
      if (!m) {
         console.error(`There were no moves found for ${ pos }.`);
         throw new Error("Oh no");
      }
      return Promise.resolve(m);
   }
}

exports.RobotPlayer = RobotPlayer;