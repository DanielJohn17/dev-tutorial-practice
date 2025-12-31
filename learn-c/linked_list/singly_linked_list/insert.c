#include "linked_list.h"
#include <stdlib.h>

single_list_t *_create_new_node(int data) {
  single_list_t *new = malloc(sizeof(single_list_t));
  if (new == NULL) {
    return NULL;
  }

  new->data = data;
  new->next = NULL;
  return new;
}

void insert_start(int data) {
  single_list_t *new = _create_new_node(data);

  if (head == NULL) {
    head = new;
    return;
  }

  new->next = head;
  head = new;
}

void insert_end(int data) {
  single_list_t *new = _create_new_node(data);
  if (head == NULL) {
    head = new;
    return;
  }

  single_list_t *temp = head;

  while (temp->next != NULL) {
    temp = temp->next;
  }

  temp->next = new;
}

void insert_at_index(int data, int index) {

  if (index == 0) {
    insert_start(data);

  } else if (index == list_len()) {
    insert_end(data);
  } else {

    single_list_t *new = _create_new_node(data);

    single_list_t *temp = head;

    for (int i = 0; i < index - 1; ++i) {
      temp = temp->next;
    }
    new->next = temp->next;
    temp->next = new;
  }
}
