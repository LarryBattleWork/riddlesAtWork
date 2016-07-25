"use strict";
declare const Promise;

import Utils = require("./Utils.ts");
import gameGraph = require("./gameStat.ts").createGameGraph();
import Player = require("./Player.ts").Player;

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

export = RobotPlayer;