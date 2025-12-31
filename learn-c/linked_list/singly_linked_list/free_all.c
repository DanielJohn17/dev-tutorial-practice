#include "linked_list.h"
#include <stdlib.h>

void free_all(void) {
  single_list_t *current = head;
  single_list_t *next_node;

  while (current != NULL) {
    next_node = current->next;

    free(current);

    current = next_node;
  }
  head = NULL;
}
