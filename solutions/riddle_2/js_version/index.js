// Author: Larry Battle
// Date: Jun 1, 2016

// Make all combinations
var createAllGameCombinations = function(){
  var pile1 = 3;
  var pile2 = 5;
  var pile3 = 7;
  var arr = [];
  
  for(var i = 0; i <= pile1; i++){
    for(var j = 0; j <= pile2; j++){
      for(var k = 0; k <= pile3; k++){
        arr.push(`${i}${j}${k}`);
      }
    }
  }
  return arr;
};
console.log('There are ' + createAllGameCombinations().length );
