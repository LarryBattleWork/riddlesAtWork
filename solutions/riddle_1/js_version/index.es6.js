// Author: Larry Battle
// Date: Jun 24, 2016
// Purpose: Solves the following riddle
// NOTE: Uses ES6!
// There is a house with N number of functional lights turned off.
// If person i enters the house they will toggle the lights that are a multiple of i.
// How many lights are on if N number of people enter the house?

"use strict";

const DEBUG = false;

const formatLights = lights => {
  return lights.map(x => x ? "on" : "off" ).join(', ')
}

const createLights = amount => {
  return Array(amount).fill(false);
}

const invitePeopleIn = lights => {
  const people = lights.length;

  for(let person = 1; person <= people; person++){
    for(let currI = person; currI <= people; currI += person){
      lights[currI-1] = !lights[currI-1];
    }
    if(DEBUG){
      console.log("Lights after person %s: => %s", person, formatLights(lights));
    }
  }
  return lights;
}

const countLightsOn = lights => {
  return lights.filter(x => x).length;
}

const validateInput = amount => {
  if(isNaN(amount) || amount < 0 ){
    throw new Error("A positive value for lights is required.");
  }
}

const parseUserInput = amount => {
  return Math.floor( parseInt(amount, 10));
}

const findAllLightsOn = amount => {
  const amountOfLights = parseUserInput( amount );
  validateInput(amountOfLights);
  const lights = createLights(amountOfLights);
  const lightsAfterPeople = invitePeopleIn(lights);
  return countLightsOn(lightsAfterPeople);
}

exports.findAllLightsOn = findAllLightsOn;
