#include <stdio.h>

#define STEP 20
#define UPPER 100
#define LOWER 0

float calc_fahr(float celisus) {
  float fahr = (9.0 / 5.0) * celisus + 32;

  return fahr;
}

int main() {
  float celius, fahr;

  celius = LOWER;

  while (celius <= UPPER) {
    fahr = calc_fahr(celius);

    printf("%3.1f %6.2f\n", celius, fahr);
    celius += STEP;
  }

  return 0;
}
