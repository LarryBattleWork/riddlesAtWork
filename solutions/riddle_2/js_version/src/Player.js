"use strict";
var Player = (function () {
    function Player(name) {
        this.name = name;
    }
    Player.prototype.toString = function () {
        return "Player: " + this.name;
    };
    return Player;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Player;
