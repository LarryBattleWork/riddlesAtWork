"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Utils_1 = require("./Utils");
var Player_1 = require("./Player");
var HumanPlayer = (function (_super) {
    __extends(HumanPlayer, _super);
    function HumanPlayer() {
        _super.apply(this, arguments);
    }
    HumanPlayer.prototype.getNextMove = function (pos) {
        return Utils_1.default.getUserInput("What is " + this.name + "'s next move? ");
    };
    return HumanPlayer;
}(Player_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HumanPlayer;
