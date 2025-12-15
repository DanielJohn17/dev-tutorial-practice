#include "snekstack.h"
#include <assert.h>
#include <stddef.h>
#include <stdlib.h>

void stack_push(stack_t *stack, void *obj) {
  if (stack->capacity == stack->count) {
    stack->capacity *= 2;
  }

  void **temp = realloc(stack->data, stack->capacity * sizeof(void *));
  if (temp == NULL) {
    stack->capacity /= 2;
    return;
  }

  stack->data = temp;
  stack->data[stack->count] = obj;
  stack->count++;
}

// don't touch below this line

stack_t *stack_new(size_t capacity) {
  stack_t *stack = malloc(sizeof(stack_t));
  if (stack == NULL) {
    return NULL;
  }

  stack->count = 0;
  stack->capacity = capacity;
  stack->data = malloc(stack->capacity * sizeof(void *));
  if (stack->data == NULL) {
    free(stack);
    return NULL;
  }

  return stack;
}
