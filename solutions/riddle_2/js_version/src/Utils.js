"use strict";
var readline = require("readline");
var Utils = {};
Utils.rNum = function (l) {
    return Math.floor(Math.random() * l);
};
Utils.rArr = function (arr) {
    return arr[Utils.rNum(arr.length)];
};
Utils.shuffleArray = function (arr) {
    return arr.sort(function (_) { return 0.5 - Math.random(); });
};
Utils.getUserInput = function (msg) {
    return new Promise(function (resolve, reject) {
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(msg, function (answer) {
            rl.close();
            resolve(answer);
        });
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Utils;
