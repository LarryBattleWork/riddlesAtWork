"use strict";

const readline = require("readline");

const Utils = {};
Utils.rNum = l => {
    return Math.floor(Math.random() * l);
};
Utils.rArr = arr => {
    return arr[Utils.rNum(arr.length)];
};
Utils.shuffleArray = arr => {
    return arr.sort(_ => 0.5 - Math.random());
};
Utils.getUserInput = msg => {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(msg, answer => {
            rl.close();
            resolve(answer);
        });
    });
};

exports.Utils = Utils;