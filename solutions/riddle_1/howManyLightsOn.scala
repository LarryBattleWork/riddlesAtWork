// Author: Larry Battle
// Date: Jun 24, 2016
// Purpose: Solves the following riddle
// There is a house with N number of functional lights turned off.
// If person i enters the house they will toggle the lights that are a multiple of i.
// How many lights are on if N number of people enter the house?

val DEBUG = true;
def formatLights(lights:List[Boolean] ):String = {
  return lights.map( if (_) "on" else "off" ).mkString(", ")
}
def createLights(amount:Int):List[Boolean] = {
  return (for( i <- 1 to amount ) yield false).toList
}
def countLightsOn(lights:List[Boolean]):Int = {
  return lights.filter(a => a).length
}
def invitePeopleIn(lights:List[Boolean]):List[Boolean] = {
  val len = lights.length;
  var arr = lights.toArray;
  if(DEBUG){
    printf("Lights start out as => %s\n", formatLights(arr.toList));
  }
  for( person <- 1 to len ){
    for ( i <- person to len by person ) {
      arr(i-1) = !arr(i-1);
    }
    if(DEBUG){
      printf("Lights after person %s: => %s\n", person, formatLights(arr.toList));
    }
  }
  return arr.toList;
}
def runRiddle(amountOfLights:Int) = {
  val lights = createLights(amountOfLights);
  val lightsAfterPeople = invitePeopleIn(lights);
  val allLightsOn = countLightsOn(lightsAfterPeople);

  printf( "There are %s lights on after everyone enters and leaves", allLightsOn);
}

runRiddle(10);
