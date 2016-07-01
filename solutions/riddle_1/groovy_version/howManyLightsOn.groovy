// Author: Larry Battle
// Date: Jun 30, 2016
// Purpose: Solves the following riddle
// There is a house with N number of functional lights turned off.
// If person i enters the house they will toggle the lights that are a multiple of i.
// How many lights are on if N number of people enter the house?

String formatLights(List<Boolean> lights){
  lights.collect({ it ? "on" : "off" }).join(', ')
}
List<Boolean> createLights(int amount){
  (1..amount).collect{ false }
}
List<Boolean> invitePeopleIn(List<Boolean> lights){
  int people = lights.size();
  // TODO Check the performance difference when using plain for loops
  (1..people).each{ person ->
    (person..people).step(person).each{ i ->
      lights[i-1] = !lights[i-1];
    }
    //System.out.println("Lights after person $person: => " + formatLights(lights));
  }
  lights;
}
int countLightsOn(List<Boolean> lights){
  lights.grep().size();
}
def runRiddle(int amountOfLights){
  def lights = createLights(amountOfLights);
  def lightsAfterPeople = invitePeopleIn(lights);
  def allLightsOn = countLightsOn(lightsAfterPeople);

  System.out.println( "allLightsOn = " + allLightsOn);
}

runRiddle(1000000);
