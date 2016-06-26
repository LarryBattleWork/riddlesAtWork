// Author: Larry Battle
// Date: Jun 24, 2016
// Purpose: Solves the following riddle
// There is a house with N number of functional lights turned off.
// If person i enters the house they will toggle the lights that are a multiple of i.
// How many lights are on if N number of people enter the house?

var DEBUG = false;
var formatLights = function(lights){
  return lights.map(x => x ? "on" : "off" ).join(', ')
};
var createLights = function(amount){
  var lights = [];
  for(var i = 0; i < amount; i++){
    lights.push(false);
  }
  return lights;
}
var invitePeopleIn = function(lights){
  var people = lights.length;
  for(var person = 1; person <= people; person++){
    for(var currI = person; currI <= people; currI += person){
      lights[currI-1] = !lights[currI-1];
    }
    if(DEBUG){
      console.log("Lights after person %s: => %s", person, formatLights(lights));
    }
  }
  return lights;
}
var countLightsOn = function(lights){
  return lights.filter(x => x).length;
}
var runRiddle = function(amountOfLights){
  var lights = createLights(amountOfLights);
  var lightsAfterPeople = invitePeopleIn(lights);
  var allLightsOn = countLightsOn(lightsAfterPeople);

  console.log( "allLightsOn = ", allLightsOn);
}

runRiddle(100);
