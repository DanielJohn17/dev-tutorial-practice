#include "exercise.h"
#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

// Helper function to check if a pointer is on the stack
bool is_on_stack(void *ptr) {
  void *stack_top = __builtin_frame_address(0);
  uintptr_t stack_top_addr = (uintptr_t)stack_top;
  uintptr_t ptr_addr = (uintptr_t)ptr;

  // Check within a threshold in both directions (e.g., 1MB)
  uintptr_t threshold = 1024;

  return ptr_addr >= (stack_top_addr - threshold) &&
         ptr_addr <= (stack_top_addr + threshold);
}

void test_1() {
  char *result = get_full_greeting("Hello", "Alice", 20);
  printf("\t%s\n", result);
  printf("\tIs pointer in stack: %s\n", is_on_stack(result) ? "True" : "False");

  free(result);
}

void test_2() {
  char *result = get_full_greeting("Hey", "Bob", 4);
  printf("\t%s\n", result);
  printf("\tIs pointer in stack: %s\n", is_on_stack(result) ? "True" : "False");

  free(result);
}
int main() {
  printf("Test 1:\n");
  test_1();
  printf("Test 2:\n");
  test_2();
  return 0;
}
