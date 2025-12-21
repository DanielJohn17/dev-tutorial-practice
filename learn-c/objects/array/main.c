#include "snekobject.h"
#include <stdio.h>
#include <stdlib.h>

void test_create_empty_array(void) {
  snek_object_t *obj = new_snek_array(2);

  printf("\tMust set type to ARRAY: %s\n",
         (obj->kind == ARRAY) ? "True" : "False");
  printf("\tMust set size to 2: %s\n",
         (obj->data.v_array.size == 2) ? "True" : "False");

  free(obj->data.v_array.elements);
  free(obj);
}

void test_used_calloc(void) {
  snek_object_t *obj = new_snek_array(2);

  printf("\tShould use calloc: %s\n",
         (obj->data.v_array.elements[0] == NULL) ? "True" : "False");
  printf("\tShould use calloc: %s\n",
         (obj->data.v_array.elements[1] == NULL) ? "True" : "False");

  free(obj->data.v_array.elements);
  free(obj);
}

int main(void) {
  printf("Test 1: Create empty array\n");
  test_create_empty_array();

  printf("\nTest 2: Used calloc\n");
  test_used_calloc();

  return 0;
}
