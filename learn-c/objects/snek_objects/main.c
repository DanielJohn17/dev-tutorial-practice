#include "snekobject.h"
#include <stdio.h>
#include <stdlib.h>

void test_integer_constant(void) {
  printf("\tINTEGER is defined as 0: %s\n", (INTEGER == 0) ? "True" : "False");
}

void test_integer_obj(void) {
  snek_object_t *obj = malloc(sizeof(snek_object_t));
  obj->kind = INTEGER;
  obj->data.v_int = 0;

  printf("\tMust be INTEGER type: %s\n",
         (obj->kind == INTEGER) ? "True" : "False");
  printf("\tMust equal zero: %s\n", (obj->data.v_int == 0) ? "True" : "False");

  free(obj);
}

int main(void) {
  printf("Test 1: Test integer constant\n");
  test_integer_constant();

  printf("\nTest 2: Test integer object\n");
  test_integer_obj();
  return 0;
}
