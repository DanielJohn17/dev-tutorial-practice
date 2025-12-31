#include "linked_list.h"
#include <stdio.h>
#include <stdlib.h>

void delete_node(int index) {

  if (head == NULL) {
    return;
  }

  if (index >= list_len() || index < 0) {
    printf("Out of index\n");
    return;
  }

  single_list_t *temp = NULL;
  single_list_t *temp2 = NULL;

  if (index == 0) {
    temp = head;
    head = head->next;
    temp->next = NULL;

  } else {
    temp = head;
    temp2 = head->next;

    for (int i = 0; i < index && temp2 != NULL; ++i) {
      temp2 = temp2->next;
      temp = temp->next;
    }
    printf("Length: %d\n", list_len());

    if (index == list_len() - 1) {
      temp->next = NULL;
    } else {
      temp->next = temp2->next;
    }

    free(temp2);
    return;
  }
  free(temp);
}
