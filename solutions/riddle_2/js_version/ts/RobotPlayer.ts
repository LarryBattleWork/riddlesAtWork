///<reference path="typings/es6-shim/es6-shim.d.ts"/>
///<reference path="typings/node/node.d.ts"/>
"use strict";

import Utils from "./Utils";
import {createGameGraph} from "./gameStat";
import Player from "./Player";

export default class RobotPlayer extends Player {
   private gameGraph

   constructor(name:string){
       super(name);
       this.name = name;
       this.gameGraph = createGameGraph();
   }

   getNextMove(pos: string) : Promise<any> {
      var p = this.gameGraph.find(n => n.position === pos);
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