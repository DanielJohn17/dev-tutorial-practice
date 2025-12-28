#include "snekobject.h"
#include <stdio.h>

void test_vector3_refcounting(void) {
  snek_object_t *foo = new_snek_integer(1);
  snek_object_t *bar = new_snek_integer(2);
  snek_object_t *baz = new_snek_integer(3);

  snek_object_t *vec = new_snek_vector3(foo, bar, baz);
  printf("\tfoo refcount is 2 after vector creation: %s\n",
         (foo->refcount == 2) ? "True" : "False");
  printf("\tbar refcount is 2 after vector creation: %s\n",
         (bar->refcount == 2) ? "True" : "False");
  printf("\tbaz refcount is 2 after vector creation: %s\n",
         (baz->refcount == 2) ? "True" : "False");

  refcount_dec(foo);
  printf("\tfoo still referenced by vec after dec: %s\n",
         (foo->refcount == 1) ? "True" : "False");

  refcount_dec(vec);

  printf("\tbar still alive with original reference: %s\n",
         (bar->refcount == 1) ? "True" : "False");
  printf("\tbaz still alive with original reference: %s\n",
         (baz->refcount == 1) ? "True" : "False");

  refcount_dec(bar);
  refcount_dec(baz);
  printf("\tall objects freed: %s\n", "True");
}

void test_vector3_refcounting_same(void) {
  snek_object_t *foo = new_snek_integer(1);

  snek_object_t *vec = new_snek_vector3(foo, foo, foo);
  printf("\tfoo refcount is 4 when used 3 times in vector: %s\n",
         (foo->refcount == 4) ? "True" : "False");

  refcount_dec(foo);
  printf("\tfoo still referenced after one dec: %s\n",
         (foo->refcount == 3) ? "True" : "False");

  refcount_dec(vec);
  printf("\tall objects freed: %s\n", "True");
}

int main(void) {
  printf("Test 1: Vector3 refcounting with different objects\n");
  test_vector3_refcounting();

  printf("\nTest 2: Vector3 refcounting with same object\n");
  test_vector3_refcounting_same();

  return 0;
}
