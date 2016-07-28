// Author: Larry Battle
// Date: Jun 1, 2016
// Purpose: Come up with a killer game plan to win the most games of 357.
// Make all combinations
"use strict";
var createAllGameCombinations = function () {
    var pile1 = 3;
    var pile2 = 5;
    var pile3 = 7;
    var arr = [], term;
    for (var i = 0; i <= pile1; i++) {
        for (var j = 0; j <= pile2; j++) {
            for (var k = 0; k <= pile3; k++) {
                var term_1 = "" + i + j + k;
                if (term_1 === '000') {
                    continue;
                }
                arr.push(term_1);
            }
        }
    }
    return arr;
};
// @{String} currentPosition - currentPosition
// @{String} newPosition - newPosition
var isValidMove = function (currentPosition, newPosition) {
    if (currentPosition.length !== newPosition.length) {
        return false;
    }
    if ('000' === currentPosition) {
        return false;
    }
    if (typeof currentPosition !== 'string' || typeof newPosition !== 'string') {
        throw new Error('isValidMove() only accepts strings.');
    }
    var pChars = currentPosition.split('');
    var idx = pChars.findIndex(function (x, i) {
        var a = parseInt(currentPosition[i], 10);
        var b = parseInt(newPosition[i], 10);
        return b < a;
    });
    if (idx === -1) {
        return false;
    }
    return pChars.every(function (c, i) {
        if (idx == i) {
            return true;
        }
        return c === newPosition[i];
    });
};
exports.isValidMove = isValidMove;
var findValidMoves = function (item, terms) {
    return terms.filter(function (term) {
        return isValidMove(item, term);
    });
};
var createNode = function (position, terms) {
    return {
        position: position,
        moves: findValidMoves(position, terms)
    };
};
var createGameGraph = function () {
    var combos = createAllGameCombinations();
    return combos.map(function (term) {
        return createNode(term, combos);
    });
};
exports.createGameGraph = createGameGraph;
var printGameStatus = function () {
    var g = createGameGraph();
    console.log(JSON.stringify(g, null, 2));
    // const gameCombos = g.reduce((s, o) => s + o.moves.length, 0 );
    // console.log( "There are %s game combinations", gameCombos.toLocaleString() );
};
var tests = function () {
    console.log("## Running Tests...");
    console.log(isValidMove("3", "3") === false);
    console.log(isValidMove("", "1") === false);
    console.log(isValidMove("0", "2") === false);
    console.log(isValidMove("123", "003") === false);
    console.log(isValidMove("3", "2") === true);
    console.log(isValidMove("123", "023") === true);
    console.log(findValidMoves("3", ["1", "2"]));
    console.log(findValidMoves("3", ["1", "3"]));
    console.log("## Test complete");
};
//tests();
//printGameStatus();
