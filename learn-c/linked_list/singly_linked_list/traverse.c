#include "linked_list.h"
#include <stdio.h>
#include <stdlib.h>

void traverse_list(void) {
  if (head == NULL) {
    printf("No list found!\n");
    return;
  }

  single_list_t *temp = head;
  while (temp != NULL) {
    printf("%d", temp->data);

    if (temp->next != NULL) {
      printf("->");
    }

    temp = temp->next;
  }

  printf("\n");
}
