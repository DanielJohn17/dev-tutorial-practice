#include "exercise.h"
#include <stdio.h>
#include <stdlib.h>

void test_1(void) {
  stack_t *s = stack_new(2);

  printf("\tMust allocate a new stack: %s\n", (s != NULL) ? "True" : "False");

  scary_double_push(s);

  printf("\n\tShould have two items in the stack: %s\n",
         (s->count == 2) ? "True" : "False");

  int value = (int)s->data[0];
  printf("\n\tZero item should be %d: %s\n", 1337,
         (value == 1337) ? "True" : "False");

  int *pointer = s->data[1];
  printf("\tTop item should be %d: %s\n", 1024,
         (*pointer == 1024) ? "True" : "False");

  free(pointer);
  stack_free(s);
}

int main(void) {
  printf("Test 1: Heterogenous Stack\n");
  test_1();
  return 0;
}

// Do not do heterogeneous stack data!!
