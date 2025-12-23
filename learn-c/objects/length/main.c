#include "snekobject.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void test_integer(void) {
  snek_object_t *obj = new_snek_integer(42);
  printf("\tInteger length is 1: %s\n",
         (snek_length(obj) == 1) ? "True" : "False");
  free(obj);
}

void test_float(void) {
  snek_object_t *obj = new_snek_float(3.14);
  printf("\tFloat length is 1: %s\n",
         (snek_length(obj) == 1) ? "True" : "False");
  free(obj);
}

void test_string(void) {
  snek_object_t *shorter = new_snek_string("hello");
  printf("\tShort string length is 5: %s\n",
         (snek_length(shorter) == 5) ? "True" : "False");
  
  snek_object_t *longer = new_snek_string("hello, world");
  printf("\tLong string length matches strlen: %s\n",
         (snek_length(longer) == strlen("hello, world")) ? "True" : "False");
  
  free(shorter->data.v_string);
  free(shorter);
  free(longer->data.v_string);
  free(longer);
}

void test_vector3(void) {
  snek_object_t *i = new_snek_integer(1);
  snek_object_t *vec = new_snek_vector3(i, i, i);
  printf("\tVector3 length is 3: %s\n",
         (snek_length(vec) == 3) ? "True" : "False");
  
  free(i);
  free(vec);
}

void test_array(void) {
  snek_object_t *i = new_snek_integer(1);
  snek_object_t *arr = new_snek_array(4);
  printf("\tArray element set at 0: %s\n",
         (snek_array_set(arr, 0, i) != 0) ? "True" : "False");
  printf("\tArray element set at 1: %s\n",
         (snek_array_set(arr, 1, i) != 0) ? "True" : "False");
  printf("\tArray element set at 2: %s\n",
         (snek_array_set(arr, 2, i) != 0) ? "True" : "False");
  printf("\tArray length is 4: %s\n",
         (snek_length(arr) == 4) ? "True" : "False");
  
  free(i);
  free(arr->data.v_array.elements);
  free(arr);
}

int main(void) {
  printf("Test 1: Integer length\n");
  test_integer();

  printf("\nTest 2: Float length\n");
  test_float();

  printf("\nTest 3: String length\n");
  test_string();

  printf("\nTest 4: Vector3 length\n");
  test_vector3();

  printf("\nTest 5: Array length\n");
  test_array();

  return 0;
}
