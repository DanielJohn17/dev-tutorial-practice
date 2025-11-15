#include <stdio.h>

int main() {
  float fahr, celicus;
  float upper = 100, lower = 0, step = 20;

  celicus = lower;

  while (celicus <= upper) {
    fahr = ((9.0 / 5.0) * celicus) + 32;
    printf("%3.1f %6.1f\n", celicus, fahr);
    celicus += step;
  }

  return 0;
}
