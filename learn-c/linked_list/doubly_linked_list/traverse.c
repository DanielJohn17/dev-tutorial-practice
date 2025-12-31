#include "double_list.h"
#include <stdio.h>
#include <stdlib.h>

void traverse_list(void) {
  double_list_t *temp = head;

  printf("Tarverse forward:\n\t");

  while (temp != NULL) {
    printf("%d", temp->data);

    if (temp->next != NULL) {
      printf("->");
    }

    temp = temp->next;
  }
  printf("\n");
}

void traverse_list_reverse(void) {
  double_list_t *temp = tail;

  printf("Traverse Reverse:\n\t");

  while (temp != NULL) {
    printf("%d", temp->data);

    if (temp->prev != NULL) {
      printf("->");
    }

    temp = temp->prev;
  }

  printf("\n");
}
