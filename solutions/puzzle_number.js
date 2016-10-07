/*
From: https://puzzling.stackexchange.com/questions/43923/we-are-5-different-numbers
There 5 different positive integer numbers smaller than 100.

The product of us is an odd number.
The product of us is a cube number.
The sum of us is a cube number.
*/
var isOdd = function(x){
  return (x % 2) == 1;
};
var isCubedNumber = function(x){
  return Number.isInteger(Math.cbrt(x));
};
var isAnswer = function(a,b,c,d,e){
  var p = a*b*c*d*e;
  var s = a+b+c+d+e;
  return isOdd(p) && isCubedNumber(p) && isCubedNumber(s);
};

var runTest = function(){
  var answers = [];
  var MAX_BOUND = 100;
  var MIN_BOUND = 1;
  for(var a = MIN_BOUND; a < MAX_BOUND-4; a++){
    for(var b = a+1; b < MAX_BOUND-3; b++){
    if(a == b){ continue; }
      for(var c = b+1; c < MAX_BOUND-2; c++){
      if(a == c || b == c){ continue; }
        for(var d = c+1; d < MAX_BOUND-1; d++){
        if(a == d || b == d || c == d){ continue; }
          for(var e = d+1; e < MAX_BOUND; e++){
            if(a == e || b == e || c == e || d == e){ continue; }
            if(isAnswer(a,b,c,d,e)){
              answers.push( [a,b,c,d,e] );
            }
          }
        }
      }
    }
  }
  return answers;
}
var answers = runTest();
console.log( "Found these: ", answers );
