#include <stdlib.h>

#include "snekobject.h"

snek_object_t *new_snek_integer(int value) {
  snek_object_t *int_object = (snek_object_t *)malloc(sizeof(snek_object_t));
  if (int_object == NULL) {
    return NULL;
  }

  int_object->kind = INTEGER;
  int_object->data.v_int = value;

  return int_object;
}
