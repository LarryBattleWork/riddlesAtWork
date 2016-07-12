// Author: Larry Battle
// Date: July 11, 2016
// Purpose: Solves the following riddle
// There is a house with N number of lights turned off.
// If person i enters the house they will toggle the lights that are a multiple of i.
// How many lights are on if N number of people enter the house?
package main

import "fmt"
import "strings"

const DEBUG = false;

func formatLights (lights []bool) string{
  strs := make([]string, cap(lights))

  for _, v := range lights {
    if v {
      strs = append(strs, "on") 
    }else{
      strs = append(strs, "off") 
    }
  }
  return strings.Join(strs, ", ")
}

func createLights(amount int) []bool{
  return make([]bool, amount)
}
func invitePeopleIn(lights []bool) []bool {
  people := len(lights)

  for person := 1; person <= people; person += 1 {
    for currI := person; currI <= people; currI += person{
      lights[currI-1] = !lights[currI-1];
    }
    if DEBUG {
      fmt.Printf("Lights after person %s: => %s", person, formatLights(lights));
    }
  }
  return lights;
}
func countLightsOn(lights []bool) int{
  sum := 0
  for _, x := range lights {
    if x {
      sum += 1
    }
  }
  return sum
}
func validateInput(amount int){
  if amount < 0 {
    panic("A positive value for lights is required.")
  }
}
func findAllLightsOn(amountOfLights int) int{
  validateInput(amountOfLights)
  var lights = createLights(amountOfLights)
  var lightsAfterPeople = invitePeopleIn(lights)
  var allLightsOn = countLightsOn(lightsAfterPeople)
  return allLightsOn;
}

func main(){
  fmt.Println( findAllLightsOn(10) );
}
