#include "exercise.h"

void test_1() {
  int *pointer = NULL;
  int expected = 10;
  allocate_int(&pointer, 10);

  printf("\tPointer should not be null: %s\n",
         (pointer != NULL) ? "True" : "False");

  printf("\tExpected: %d and Result: %d\n", expected, *pointer);

  free(pointer);
}
void test_2() {
  int value = 5;
  int *pointer = &value;
  int expected = 20;
  allocate_int(&pointer, 20);

  printf("\tValue should be 5: %s\n", (value == 5) ? "True" : "False");

  printf("\tPointer should not be null: %s\n",
         (pointer != NULL) ? "True" : "False");

  printf("\tExpected: %d and Result: %d\n", expected, *pointer);

  free(pointer);
}

int main() {
  printf("Test 1\n");
  test_1();
  printf("\nTest 2\n");
  test_2();
}
