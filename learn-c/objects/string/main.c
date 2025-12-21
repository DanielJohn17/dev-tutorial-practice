#include "snekobject.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void test_str_copied(void) {
  char *input = "Hello, World!";
  snek_object_t *obj = new_snek_string(input);

  printf("\tMust be a string: %s\n", (obj->kind == STRING) ? "True" : "False");
  printf("\tYou need to copy the string: %s\n",
         (obj->data.v_string != input) ? "True" : "False");

  printf("\tShould copy string correctly: %s\n",
         (strcmp(obj->data.v_string, input) == 0) ? "True" : "False");

  free(obj->data.v_string);
  free(obj);
}

int main(void) {
  printf("Test 1: Test string copy\n");
  test_str_copied();

  return 0;
}
