#pragma once

typedef struct SingleList single_list_t;

struct SingleList {
  int data;
  single_list_t *next;
};

// insert to list
void insert_start(int data);
void insert_end(int data);
void insert_at_index(int data, int index);

// traverse
void traverse_list(void);

// delete
void delete_node(int index);

// free all
void free_all(void);

// list length
int list_len(void);

extern single_list_t *head;
