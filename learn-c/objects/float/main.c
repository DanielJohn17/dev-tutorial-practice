#include "snekobject.h"
#include <stdio.h>
#include <stdlib.h>

void test_positive(void) {
  snek_object_t *obj = new_snek_integer(42);
  printf("\tMust allow positive numbers: %s\n",
         (obj->data.v_int == 42) ? "True" : "False");

  free(obj);
}

void test_zero(void) {
  snek_object_t *obj = new_snek_float(0.0);

  printf("\tMust be FLOAT type: %s\n", (obj->kind == FLOAT) ? "True" : "False");
  printf("\tMust accept 0.0: %s\n",
         (obj->data.v_float == 0.0) ? "True" : "False");
  free(obj);
}

void test_negative(void) {
  snek_object_t *obj = new_snek_float(-5.0);

  printf("\tMust be FLOAT type: %s\n", (obj->kind == FLOAT) ? "True" : "False");
  printf("\tMust allow negative numbers: %s\n",
         (obj->data.v_float == -5.0) ? "True" : "False");

  free(obj);
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
