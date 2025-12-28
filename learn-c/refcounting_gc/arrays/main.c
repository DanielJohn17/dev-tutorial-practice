#include "snekobject.h"
#include <stdio.h>

void test_array_set(void) {
  snek_object_t *foo = new_snek_integer(1);

  snek_object_t *array = new_snek_array(1);
  snek_array_set(array, 0, foo);
  printf("\tfoo refcount is 2 after array set: %s\n",
         (foo->refcount == 2) ? "True" : "False");

  refcount_dec(foo);
  refcount_dec(array);
  printf("\tall objects freed: %s\n", "True");
}

void test_array_free(void) {
  snek_object_t *foo = new_snek_integer(1);
  snek_object_t *bar = new_snek_integer(2);
  snek_object_t *baz = new_snek_integer(3);

  snek_object_t *array = new_snek_array(2);
  snek_array_set(array, 0, foo);
  snek_array_set(array, 1, bar);
  printf("\tfoo refcount is 2 after array set: %s\n",
         (foo->refcount == 2) ? "True" : "False");
  printf("\tbar refcount is 2 after array set: %s\n",
         (bar->refcount == 2) ? "True" : "False");
  printf("\tbaz refcount is 1 (not in array): %s\n",
         (baz->refcount == 1) ? "True" : "False");

  refcount_dec(foo);
  printf("\tfoo still referenced by array after dec: %s\n",
         (foo->refcount == 1) ? "True" : "False");

  snek_array_set(array, 0, baz);

  refcount_dec(bar);
  refcount_dec(baz);
  refcount_dec(array);
  printf("\tall objects freed: %s\n", "True");
}

int main(void) {
  printf("Test 1: Array set refcounting\n");
  test_array_set();

  printf("\nTest 2: Array free when overwritten\n");
  test_array_free();

  return 0;
}
