#include "double_list.h"
#include <stdlib.h>

void free_all(void) {
  double_list_t *current = head;
  double_list_t *next_node;

  while (current != NULL) {
    next_node = current->next;

    free(current);

    current = next_node;
  }

  head = NULL;
  tail = NULL;
}
