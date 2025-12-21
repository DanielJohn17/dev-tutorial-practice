#include "snekobject.h"
#include <stdio.h>
#include <stdlib.h>

void test_returns_null(void) {
  snek_object_t *vec = new_snek_vector3(NULL, NULL, NULL);
  printf("\tShould return null when input is null: %s\n",
         (vec == NULL) ? "True" : "False");
}

void test_vec_multiple_objects(void) {
  snek_object_t *x = new_snek_integer(1);
  snek_object_t *y = new_snek_integer(2);
  snek_object_t *z = new_snek_integer(3);
  snek_object_t *vec = new_snek_vector3(x, y, z);

  printf("\tShould allocate a new object: %s\n",
         (vec != NULL) ? "True" : "False");

  printf("\n\tShould reference x: %s\n",
         (vec->data.v_vector3.x == x) ? "True" : "False");
  printf("\tShould reference y: %s\n",
         (vec->data.v_vector3.y == y) ? "True" : "False");
  printf("\tShould reference z: %s\n",
         (vec->data.v_vector3.z == z) ? "True" : "False");

  printf("\n\tShould have correct x: %s\n",
         (vec->data.v_vector3.x->data.v_int == 1) ? "True" : "False");
  printf("\tShould have correct y: %s\n",
         (vec->data.v_vector3.y->data.v_int == 2) ? "True" : "False");
  printf("\tShould have correct z: %s\n",
         (vec->data.v_vector3.z->data.v_int == 3) ? "True" : "False");

  free(x);
  free(y);
  free(z);
  free(vec);
}

void test_vec_same_object(void) {
  snek_object_t *i = new_snek_integer(1);
  snek_object_t *vec = new_snek_vector3(i, i, i);

  printf("\tShould allocate a new object: %s\n",
         (vec != NULL) ? "True" : "False");

  printf("\n\tShould reference x: %s\n",
         (vec->data.v_vector3.x == i) ? "True" : "False");
  printf("\tShould reference y: %s\n",
         (vec->data.v_vector3.y == i) ? "True" : "False");
  printf("\tShould reference z: %s\n",
         (vec->data.v_vector3.z == i) ? "True" : "False");

  printf("\n\tShould have correct x: %s\n",
         (vec->data.v_vector3.x->data.v_int == 1) ? "True" : "False");
  printf("\tShould have correct y: %s\n",
         (vec->data.v_vector3.y->data.v_int == 1) ? "True" : "False");
  printf("\tShould have correct z: %s\n",
         (vec->data.v_vector3.z->data.v_int == 1) ? "True" : "False");

  i->data.v_int = 2;

  printf("\n\tShould have correct x: %s\n",
         (vec->data.v_vector3.x->data.v_int == 2) ? "True" : "False");
  printf("\tShould have correct y: %s\n",
         (vec->data.v_vector3.y->data.v_int == 2) ? "True" : "False");
  printf("\tShould have correct z: %s\n",
         (vec->data.v_vector3.z->data.v_int == 2) ? "True" : "False");

  free(i);
  free(vec);
}

int main(void) {
  printf("Test 1: Test returns null\n");
  test_returns_null();

  printf("\nTest 2: Test multiple vector objects\n");
  test_vec_multiple_objects();

  printf("\nTest 3: Test same vector object\n");
  test_vec_same_object();

  return 0;
}
