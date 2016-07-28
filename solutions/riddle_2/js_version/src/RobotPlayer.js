///<reference path="typings/es6-shim/es6-shim.d.ts"/>
///<reference path="typings/node/node.d.ts"/>
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Utils_1 = require("./Utils");
var gameStat_1 = require("./gameStat");
var Player_1 = require("./Player");
var RobotPlayer = (function (_super) {
    __extends(RobotPlayer, _super);
    function RobotPlayer(name) {
        _super.call(this, name);
        this.name = name;
        this.gameGraph = gameStat_1.createGameGraph();
    }
    RobotPlayer.prototype.getNextMove = function (pos) {
        var p = this.gameGraph.find(function (n) { return n.position === pos; });
        if (!p) {
            console.error("Error: " + pos + " is an invalid MOVE!!??");
            throw new Error('Oh no.');
        }
        var m = Utils_1.default.rArr(p.moves);
        if (!m) {
            console.error("There were no moves found for " + pos + ".");
            throw new Error("Oh no");
        }
        return Promise.resolve(m);
    };
    return RobotPlayer;
}(Player_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RobotPlayer;
