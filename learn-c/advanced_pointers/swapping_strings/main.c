#include "exercise.h"
#include <stdio.h>

void test_1() {
  char *a = "Hello";
  char *b = "Goodbye";

  swap_strings(&a, &b);

  printf("\tExpected from a: %s and Result found from a: %s\n", "Goodbye", a);
  printf("\tExpected from b: %s and Result found from b: %s\n", "Hello", b);
}

int main() {
  printf("Test 1\n");
  test_1();

  return 0;
}
