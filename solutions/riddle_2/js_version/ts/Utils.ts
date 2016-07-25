"use strict";
declare const require;
declare const process;
declare const Promise;

const readline = require("readline");

let Utils = {
    rNum : l => {
    return Math.floor(Math.random() * l);
},
rArr : arr => {
    return arr[Utils.rNum(arr.length)];
},
shuffleArray : arr => {
    return arr.sort(_ => 0.5 - Math.random());
},
getUserInput : msg => {
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
}
};

export = Utils;