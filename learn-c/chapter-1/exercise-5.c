#include <stdio.h>

int main() {
  float celicus;

  for (float fahr = 300; fahr >= 0; fahr -= 20) {
    celicus = (5.0 / 9.0) * (fahr - 32);
    printf("%3.1f %6.1f\n", fahr, celicus);
  }
  return 0;
}
