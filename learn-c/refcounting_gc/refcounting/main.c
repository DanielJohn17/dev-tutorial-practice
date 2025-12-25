#include "snekobject.h"
#include <stdio.h>
#include <stdlib.h>

void test_int_has_refcount(void) {
  snek_object_t *obj = new_snek_integer(10);
  printf("\tInteger refcount is 1 on creation: %s\n",
         (obj->refcount == 1) ? "True" : "False");
  free(obj);
}

void test_float_has_refcount(void) {
  snek_object_t *obj = new_snek_float(42.0);
  printf("\tFloat refcount is 1 on creation: %s\n",
         (obj->refcount == 1) ? "True" : "False");
  free(obj);
}

int main(void) {
  printf("Test 1: Integer has refcount\n");
  test_int_has_refcount();

  printf("\nTest 2: Float has refcount\n");
  test_float_has_refcount();

  return 0;
}
