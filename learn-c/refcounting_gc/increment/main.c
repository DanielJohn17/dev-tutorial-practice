#include "snekobject.h"
#include <stdio.h>
#include <stdlib.h>

void test_inc_refcount(void) {
  snek_object_t *obj = new_snek_integer(10);
  printf("\tRefcount is 1 on creation: %s\n",
         (obj->refcount == 1) ? "True" : "False");

  refcount_inc(obj);
  printf("\tRefcount increments to 2: %s\n",
         (obj->refcount == 2) ? "True" : "False");

  free(obj);
}

void test_inc_refcount_more(void) {
  snek_object_t *obj = new_snek_float(4.20);
  printf("\tRefcount is 1 on creation: %s\n",
         (obj->refcount == 1) ? "True" : "False");

  refcount_inc(obj);
  refcount_inc(obj);
  refcount_inc(obj);
  refcount_inc(obj);
  refcount_inc(obj);

  printf("\tRefcount increments to 6: %s\n",
         (obj->refcount == 6) ? "True" : "False");

  free(obj);
}

void test_null_obj(void) {
  refcount_inc(NULL);
  printf("\tIncrementing NULL is safe: %s\n", "True");
}

int main(void) {
  printf("Test 1: Increment refcount (integer)\n");
  test_inc_refcount();

  printf("\nTest 2: Increment refcount many (float)\n");
  test_inc_refcount_more();

  printf("\nTest 3: Increment NULL object\n");
  test_null_obj();

  return 0;
}
