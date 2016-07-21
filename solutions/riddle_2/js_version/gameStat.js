// Author: Larry Battle
// Date: Jun 1, 2016
// Purpose: Come up with a killer game plan to win the most games of 357.

// Make all combinations
"use strict";
const createAllGameCombinations = function(){
  const pile1 = 3;
  const pile2 = 5;
  const pile3 = 7;
  let arr = [], term;
  
  for(let i = 0; i <= pile1; i++){
    for(let j = 0; j <= pile2; j++){
      for(let k = 0; k <= pile3; k++){
        let term = `${i}${j}${k}`;
        if(term === '000'){
          continue;
        }
        arr.push(term);
      }
    }
  }
  return arr;
};
// @{String} currentPosition - currentPosition
// @{String} newPosition - newPosition
const isValidMove = function(currentPosition, newPosition){
  if( currentPosition.length !== newPosition.length ){
    return false;
  }
  if( typeof currentPosition !== 'string' || typeof newPosition !== 'string' ){
    throw new Error('isValidMove() only accepts strings.');
  }
  const pChars = currentPosition.split('');
  const idx = pChars.findIndex((x, i ) => {
      const a = parseInt(currentPosition[i], 10);
      const b = parseInt(newPosition[i], 10)
      return b < a;
    });
  
  if( idx === -1){
    return false;
  }
  return pChars.every((c, i) => {
    if( idx == i ){
      return true;
    }
    return c === newPosition[i];
  });
};
const findValidMoves = function(item, terms){
  return terms.filter(function(term){
    return isValidMove(item, term);
  });
};
const createNode = function( position, terms ){
  return {
    position,
    moves: findValidMoves(position, terms)
  };
}
const createGameGraph = function(){
  const combos = createAllGameCombinations();
  return combos.map(function(term){
    return createNode( term, combos);
  });
};
const printGameStatus = function(){
 var g = createGameGraph();

 console.log( JSON.stringify( g, null, 2) );
// const gameCombos = g.reduce((s, o) => s + o.moves.length, 0 );
// console.log( "There are %s game combinations", gameCombos.toLocaleString() );
};
const tests = function(){
  console.log( "## Running Tests..." );

  console.log( isValidMove( "3", "3" ) === false );
  console.log( isValidMove( "", "1" ) === false );
  console.log( isValidMove( "0", "2" ) === false );
  console.log( isValidMove( "123", "003" ) === false );

  console.log( isValidMove( "3", "2" ) === true );
  console.log( isValidMove( "123", "023" ) === true );
  
  console.log( findValidMoves("3", ["1","2"]) );
  console.log( findValidMoves("3", ["1","3"]) );
  console.log( "## Test complete" );
};
//tests();
//printGameStatus();

exports.createGameGraph = createGameGraph;
exports.isValidMove = isValidMove;
