#include "double_list.h"
#include <stdlib.h>

int list_len(void) {
  int count = 0;

  double_list_t *temp = head;
  while (temp != NULL) {
    count++;
    temp = temp->next;
  }

  return count;
}
