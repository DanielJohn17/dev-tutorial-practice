#include "exercise.h"
#include <stdio.h>

void test_1() {
  int a = 5;
  int b = 6;

  swap_ints(&a, &b);

  printf("\ta is 6: %s\n", (a == 6) ? "True" : "False");
  printf("\tb is 5: %s\n", (b == 5) ? "True" : "False");
}

void test_2() {
  int a = 5;

  swap_ints(&a, &a);

  printf("\ta is still 5: %s\n", (a == 5) ? "True" : "False");
}

int main() {
  printf("Test 1\n");
  test_1();
  printf("\nTest 2\n");
  test_2();

  return 0;
}
