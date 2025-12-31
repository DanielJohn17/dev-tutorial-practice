#include "double_list.h"
#include <stdio.h>
#include <stdlib.h>

double_list_t *head = NULL;
double_list_t *tail = NULL;

int input(int *result);

int main(void) {
  int result;

  printf("\tDoubly Linked list\n");

  for (;;) {
    int option;
    printf(
        "Select an option:\n \t1. Insert new number\n \t2. Delete a "
        "number\n \t3. Display forward\n \t4. Display reverse\n \t5. Exit\n");
    scanf("%d", &option);

    switch (option) {
    case 1: {
      if (input(&result) == 0) {
        break;
      }
      printf("\t1. Add at start\n \t2. Add at end\n \t3. Add at index\n");
      scanf("%d", &option);

      switch (option) {
      case 1:
        insert_start(result);
        break;
      case 2:
        insert_end(result);
        break;
      case 3: {
        printf("Enter index: ");
        int index;
        if (scanf("%d", &index) != 1) {
          while (getchar() != '\n')
            ; // Clear buffer on failure
          printf("Index is not an integer!!\n");
          break;
        }
        insert_at_index(result, index);
        break;
      }
      default:
        while (getchar() != '\n')
          ; // Clear buffer on failure
        printf("Invalid option\n");
        break;
      }
      break;
    case 2: {
      printf("Enter index: ");
      int index;
      if (scanf("%d", &index) != 1) {
        while (getchar() != '\n')
          ; // Clear buffer on failure
        printf("Invalid Index\n");
        break;
      }

      delete_node(index);
      printf("Deleted node at index: %d\n", index);
      break;
    }
    case 3:
      traverse_list();
      break;
    case 4:
      traverse_list_reverse();
      break;
    case 5:
      free_all();
      return 0;
    default:
      while (getchar() != '\n')
        ; // Clear buffer on failure
      printf("Invalid option\n");
      break;
    }
    }
  }
}

int input(int *result) {
  printf("Input an integer:\n");

  if (scanf("%d", result) != 1) {
    while (getchar() != '\n')
      ; // Clear buffer on failure
    printf("Input is not an integer\n");
    return 0;
  }

  return 1;
}
