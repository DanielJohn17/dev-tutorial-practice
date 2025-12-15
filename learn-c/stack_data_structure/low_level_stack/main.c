#include "snekstack.h"
#include <stdio.h>
#include <stdlib.h>

void test_1(void) {
  stack_t *s = stack_new(3);

  printf("\tSets stack capacity to %d: %s\n", 3,
         s->capacity == 3 ? "True" : "False");
  printf("\tSets stack capacity to %d: %s\n", 0,
         s->count == 0 ? "True" : "False");
  printf("\tAllocates the stack data: %s\n",
         s->data != NULL ? "True" : "False");

  free(s->data);
  free(s);
}

int main(void) {
  printf("Test 1\n");
  test_1();

  return 0;
}
