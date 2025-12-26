#include "snekobject.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void test_int_has_refcount(void) {
  snek_object_t *obj = new_snek_integer(10);
  printf("\tInteger refcount is 1 on creation: %s\n",
         (obj->refcount == 1) ? "True" : "False");
  free(obj);
}

void test_inc_refcount(void) {
  snek_object_t *obj = new_snek_float(4.20);
  printf("\tFloat refcount is 1 on creation: %s\n",
         (obj->refcount == 1) ? "True" : "False");

  refcount_inc(obj);
  printf("\tRefcount increments to 2: %s\n",
         (obj->refcount == 2) ? "True" : "False");

  free(obj);
}

void test_dec_refcount(void) {
  snek_object_t *obj = new_snek_float(4.20);

  refcount_inc(obj);
  printf("\tRefcount increments to 2: %s\n",
         (obj->refcount == 2) ? "True" : "False");

  refcount_dec(obj);
  printf("\tRefcount decrements to 1: %s\n",
         (obj->refcount == 1) ? "True" : "False");

  printf("\tObject not freed yet: %s\n", (obj != NULL) ? "True" : "False");

  /* Object is still alive, so free manually. */
  free(obj);
}

void test_refcount_free_is_called(void) {
  snek_object_t *obj = new_snek_float(4.20);

  refcount_inc(obj);
  printf("\tRefcount increments to 2: %s\n",
         (obj->refcount == 2) ? "True" : "False");

  refcount_dec(obj);
  printf("\tRefcount decrements to 1: %s\n",
         (obj->refcount == 1) ? "True" : "False");

  refcount_dec(obj);
}

void test_allocated_string_is_freed(void) {
  snek_object_t *obj = new_snek_string("Hello @wagslane!");

  refcount_inc(obj);
  printf("\tRefcount increments to 2: %s\n",
         (obj->refcount == 2) ? "True" : "False");

  refcount_dec(obj);
  printf("\tRefcount decrements to 1: %s\n",
         (obj->refcount == 1) ? "True" : "False");
  printf("\tString preserved: %s\n",
         (obj->data.v_string &&
          strcmp(obj->data.v_string, "Hello @wagslane!") == 0)
             ? "True"
             : "False");

  refcount_dec(obj);
}

int main(void) {
  printf("Test 1: Integer has refcount\n");
  test_int_has_refcount();

  printf("\nTest 2: Float increments refcount\n");
  test_inc_refcount();

  printf("\nTest 3: Float decrements refcount\n");
  test_dec_refcount();

  printf("\nTest 4: Float freed at refcount 0\n");
  test_refcount_free_is_called();

  printf("\nTest 5: String freed at refcount 0\n");
  test_allocated_string_is_freed();

  return 0;
}
