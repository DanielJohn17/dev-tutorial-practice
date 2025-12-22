#include "snekobject.h"
#include <stdio.h>
#include <stdlib.h>

void test_array(void) {
  // Create an array
  snek_object_t *obj = new_snek_array(2);

  // Create some objects to put in the array
  // Can store objects, even though they have different types (just like Python)
  snek_object_t *first = new_snek_string("First");
  snek_object_t *second = new_snek_integer(3);

  printf("\tFirst object set: %s\n",
         snek_array_set(obj, 0, first) ? "True" : "False");
  printf("\tSecond object set: %s\n",
         snek_array_set(obj, 1, second) ? "True" : "False");

  snek_object_t *retrieved_first = snek_array_get(obj, 0);
  printf("\n\tShould find the first object: %s\n",
         (retrieved_first != NULL) ? "True" : "False");
  printf("\tShould be a string: %s\n",
         (retrieved_first->kind == STRING) ? "True" : "False");
  printf("\tShould be the same object: %s\n",
         (retrieved_first == first) ? "True" : "False");

  snek_object_t *retrieved_second = snek_array_get(obj, 1);
  printf("\n\tShould find the second object: %s\n",
         (retrieved_second != NULL) ? "True" : "False");
  printf("\tShould be an integer: %s\n",
         (retrieved_second->kind == INTEGER) ? "True" : "False");
  printf("\tShould be the same object: %s\n",
         (retrieved_second == second) ? "True" : "False");

  free(first->data.v_string);
  free(first);
  free(second);
  free(obj->data.v_array.elements);
  free(obj);
}

void test_set_outside_bounds(void) {
  // Create an array
  snek_object_t *obj = new_snek_array(2);

  snek_object_t *outside = new_snek_string("First");

  // Inside of bound
  printf("\tObject set inbound: %s\n",
         snek_array_set(obj, 1, outside) ? "True" : "False");

  // Outside of bound
  printf(
      "\tObject should not be set outside of the bound -> returns false: %s\n",
      (snek_array_set(obj, 100, outside) == 0) ? "True" : "False");

  // Free memory
  free(outside->data.v_string);
  free(outside);
  free(obj->data.v_array.elements);
  free(obj);
}

void test_get_outside_bounds(void) {
  // Create an array
  snek_object_t *obj = new_snek_array(1);
  snek_object_t *first = new_snek_string("First");
  printf("\tObject set: %s\n",
         snek_array_set(obj, 0, first) ? "True" : "False");

  // Outside of bound
  printf("\tShould not access outside the array: %s\n",
         (snek_array_get(obj, 1) == NULL) ? "True" : "False");

  free(first->data.v_string);
  free(first);
  free(obj->data.v_array.elements);
  free(obj);
}

int main(void) {
  printf("Test 1: Set and get values from array\n");
  test_array();

  printf("\nTest 2: Set outside bounds\n");
  test_get_outside_bounds();

  printf("\nTest 3: Get outside bounds\n");
  test_get_outside_bounds();

  return 0;
}
