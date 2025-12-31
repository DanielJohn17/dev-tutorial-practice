#include "double_list.h"
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

  double_list_t *temp = NULL;

  if (index == 0) {
    temp = head;
    head = head->next;
    head->prev = NULL;
    temp->next = NULL;

  } else if (index == list_len() - 1) {
    temp = tail;
    tail = tail->prev;
    tail->next = NULL;
    temp->prev = NULL;

  } else {
    temp = head;

    for (int i = 0; i < index && temp != NULL; ++i) {
      temp = temp->next;
    }

    temp->prev->next = temp->next;
    temp->next->prev = temp->prev;
  }
  free(temp);
  temp = NULL;
}
