#include "snekobject.h"
#include <stdio.h>
#include <stdlib.h>

void test_positive(void) {
  snek_object_t *int_object = new_snek_integer(42);
  printf("\tMust allow positive numbers: %s\n",
         (int_object->data.v_int == 42) ? "True" : "False");

  free(int_object);
}

void test_zero(void) {
  snek_object_t *int_object = new_snek_integer(0);

  printf("\tMust be INTEGER type: %s\n",
         (int_object->kind == INTEGER) ? "True" : "False");
  printf("\tMust equal zero: %s\n",
         (int_object->data.v_int == 0) ? "True" : "False");
  free(int_object);
}

void test_negative(void) {
  snek_object_t *int_object = new_snek_integer(-5);

  printf("\tMust be INTEGER type: %s\n",
         (int_object->kind == INTEGER) ? "True" : "False");
  printf("\tMust allow negative numbers: %s\n",
         (int_object->data.v_int == -5) ? "True" : "False");

  free(int_object);
}

int main(void) {
  printf("Test 1: Test positive\n");
  test_positive();

  printf("\nTest 2: Test zero\n");
  test_zero();

  printf("\nTest 3: Test negative\n");
  test_negative();

  return 0;
}
