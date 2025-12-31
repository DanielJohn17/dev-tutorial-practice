
#include "linked_list.h"
#include <stdlib.h>
int list_len(void) {
  int count = 0;
  single_list_t *temp = head;

  while (temp != NULL) {
    temp = temp->next;
    count++;
  }

  return count;
}
