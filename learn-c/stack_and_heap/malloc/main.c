#include "exercise.h"

#include <stdio.h>
#include <stdlib.h>

void test_1() {
  int size = 5;
  int multiplier = 2;
  int *result = allocate_scalar_array(size, multiplier);

  printf("\tFunction should return a non-null value: %s\n",
         (result != NULL) ? "True" : "False");
  free(result);
}

void test_2() {
  int size = 5;
  int multiplier = 2;
  int *result = allocate_scalar_array(size, multiplier);

  int expected[5];
  expected[0] = 0;
  expected[1] = 2;
  expected[2] = 4;
  expected[3] = 6;
  expected[4] = 8;

  for (int i = 0; i < size; ++i) {
    printf("\tExpected: %d and Result: %d\n", expected[i], result[i]);
  }

  free(result);
}

int main() {
  printf("Test 1:\n");
  test_1();
  printf("\nTest 2\n");
  test_2();
}
