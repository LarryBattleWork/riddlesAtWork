// Computes the odds of 2 dice rolls adding up to 9 or higher.
// TODO Add Test cases
// Created: Oct 31, 2016
var arrayUtil = {
  avg: function(row){
    return row.reduce((s,x) => s+x)/row.length
  },
  sum: function(row){
    return row.reduce((s,x) => s+x);
  }
}
// todo We need more power! Rewrite without arrays but.... it's fast enough right now. 
var dices = {
  getRandomRoll : function(){
      var arr = new Uint32Array(1);
      window.crypto.getRandomValues(arr);
      return 1 + (arr[0] % 6);
  },
  getRandomRolls : function(x){
      var rolls = [];
      for(var i = 0; i < Math.max(0, x); i++){
        rolls.push( dices.getRandomRoll() );
      }
      return rolls;
  },
  getSumOfRandomRolls: function(amountOfRolls){
    return arrayUtil.sum(dices.getRandomRolls(amountOfRolls));
  },
  oddsOfXOrHigherRandomRolls: function(amountOfRolls, value, trails){
      var rolls_sums = [];
      for(var i = 0; i < Math.max(0, trails); i++){
        rolls_sums.push( dices.getSumOfRandomRolls(amountOfRolls) );
      }
      var sum = rolls_sums.filter( s => value <= s).length;
      var p = sum / rolls_sums.length;
      return p;
  }
};
var output = dices.oddsOfXOrHigherRandomRolls(2, 9, 1e6);
console.log( "output = ", output );

// Added this for fun.
var plots = {
   getBoxPlotPoints : function(numbers){
    var row = numbers.sort();
    
    return {
      '0': row[0],
      '25': row[Math.floor(0.25 * row.length)],
      '50': row[Math.floor(0.5 * row.length)],
      '75': row[Math.floor(0.75 * row.length)],
      '100': row[row.length - 1],
      // you want the average for the middle point
      'avg': arrayUtil.avg(row)
    }
  }
};
