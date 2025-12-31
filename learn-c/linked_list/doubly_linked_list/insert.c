#include "double_list.h"
#include <stdio.h>
#include <stdlib.h>

double_list_t *_create_new_node(int data) {
  double_list_t *new = malloc(sizeof(double_list_t));
  if (new == NULL) {
    return NULL;
  }

  new->data = data;
  new->next = NULL;
  new->prev = NULL;

  return new;
}

void insert_start(int data) {
  double_list_t *new = _create_new_node(data);

  if (head == NULL) {
    head = new;
    tail = new;
    return;
  }

  new->next = head;
  head->prev = new;

  head = new;
}

void insert_end(int data) {
  double_list_t *new = _create_new_node(data);

  if (tail == NULL) {
    head = new;
    tail = new;
    return;
  }

  new->prev = tail;
  tail->next = new;

  tail = new;
}

void insert_at_index(int data, int index) {
  double_list_t *new = _create_new_node(data);

  if (index >= list_len()) {
    printf("Invalid index.\n");
    return;
  }

  double_list_t *temp = head;
  if (index == 0) {
    insert_start(data);
  } else if (index == list_len() - 1) {
    insert_end(data);
  } else {

    for (int i = 0; i < index; i++) {
      temp = temp->next;
    }

    new->prev = temp->prev;
    temp->prev->next = new;

    new->next = temp;
    temp->prev = new;
  }
}
