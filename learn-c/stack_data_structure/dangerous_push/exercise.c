#include "snekstack.h"
#include "stdlib.h"

void scary_double_push(stack_t *s) {
  stack_push(s, (void *)1337);

  int *int_pointer = (int *)malloc(sizeof(int));
  *int_pointer = 1024;

  stack_push(s, (void *)int_pointer);
}
