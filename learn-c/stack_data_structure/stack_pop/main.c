#include "snekstack.h"
#include <stdio.h>
#include <stdlib.h>

void test_1(void) {
  stack_t *s = stack_new(2);

  printf("\tMust allocate new stack: %s\n", (s != NULL) ? "True" : "False");
  printf("\tSets capacity to %d: %s\n", 2,
         (s->capacity) == 2 ? "True" : "False");
  printf("\tSets count to %d: %s\n", 0, (s->count == 0) ? "True" : "False");
  printf("\tAllocates the stack data: %s\n",
         (s->data != NULL) ? "True" : "False");

  int one = 1;
  int two = 2;
  int three = 3;

  stack_push(s, &one);
  stack_push(s, &two);

  printf("\n\tSets capacity to %d: %s\n", 2,
         (s->capacity) == 2 ? "True" : "False");
  printf("\t%d elements in the stack: %s\n", 2,
         (s->count) == 2 ? "True" : "False");

  stack_push(s, &three);

  printf("\n\tCapacity is doubled: %s\n",
         (s->capacity == 4) ? "True" : "False");
  printf("\t%d elements in the stack: %s\n", 3,
         (s->count == 3) ? "True" : "False");

  int *popped = stack_pop(s);

  printf("\n\tPopped element is %d: %s\n", three,
         (*popped == three) ? "True" : "False");

  popped = stack_pop(s);
  printf("\tPopped element is %d: %s\n", two,
         (*popped == two) ? "True" : "False");

  popped = stack_pop(s);
  printf("\tPopped element is %d: %s\n", one,
         (*popped == one) ? "True" : "False");

  popped = stack_pop(s);
  printf("\tThere are no remaining elements: %s\n",
         (popped == NULL) ? "True" : "False");

  free(s->data);
  free(s);
}

int main(void) {
  printf("Test 1\n");
  test_1();

  return 0;
}
