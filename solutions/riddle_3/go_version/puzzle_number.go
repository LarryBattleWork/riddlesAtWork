package main
/*
From: https://puzzling.stackexchange.com/questions/43923/we-are-5-different-numbers
There 5 different positive integer numbers smaller than 100.

The product of us is an odd number.
The product of us is a cube number.
The sum of us is a cube number.
*/
import "fmt"
import "math"

func isOdd(number int) bool {
    return number%2 != 0
}
func isInt(a float64) bool {
    return a == float64(int64(a))
}
func isCubedNumber(x int) bool{
    return isInt(math.Cbrt( float64(x)))
}
func isAnswer (a,b,c,d,e int) bool{
  p := a*b*c*d*e;
  s := a+b+c+d+e;
  return isOdd(p) && isCubedNumber(p) && isCubedNumber(s);
};

func runTest () []string {
  answers := []string{};
  const(
  MAX_BOUND = 100
  MIN_BOUND = 1
  )
  for a := MIN_BOUND; a < MAX_BOUND-4; a+=1 {
    for b := a+1; b < MAX_BOUND-3; b+=1 {
    if(a == b){ continue; }
      for c := b+1; c < MAX_BOUND-2; c+=1 {
      if(a == c || b == c){ continue; }
        for d := c+1; d < MAX_BOUND-1; d+=1 {
        if(a == d || b == d || c == d){ continue; }
          for e := d+1; e < MAX_BOUND; e+=1 {
            if(a == e || b == e || c == e || d == e){ continue; }
            if(isAnswer(a,b,c,d,e)){
              answers = append(answers, fmt.Sprintf("[%d, %d, %d, %d, %d]", a,b,c,d,e ) );
            }
          }
        }
      }
    }
  }
  return answers;
}

func main(){
    answers := runTest();
    fmt.Printf( "Found these: %v/n", answers );
}
