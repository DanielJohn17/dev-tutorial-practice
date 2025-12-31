#pragma once

typedef struct DoubleList double_list_t;

struct DoubleList {
  int data;
  double_list_t *next;
  double_list_t *prev;
};

// insert
void insert_start(int data);
void insert_end(int data);
void insert_at_index(int data, int index);

// delete
void delete_node(int index);

// traverse
void traverse_list(void);
void traverse_list_reverse(void);

// length
int list_len(void);

// Free all
void free_all(void);

extern double_list_t *head;
extern double_list_t *tail;
