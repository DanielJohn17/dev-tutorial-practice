#include "stdlib.h"

#include "exercise.h"

void allocate_int(int **pointer_pointer, int value) {
  int *new_pointer = (int *)malloc(sizeof(int));
  *pointer_pointer = new_pointer;

  *new_pointer = value;
}
