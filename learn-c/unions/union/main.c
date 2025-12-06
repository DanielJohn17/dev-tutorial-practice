#include "exercise.h"
#include <stdio.h>

void test_1() {
  char buffer[100];
  snek_object_t i = new_integer(5);

  format_object(i, buffer);
  printf("%s\n", buffer);
}

void test_2() {
  char buffer[100];
  snek_object_t s = new_string("I use neovim btw!");

  format_object(s, buffer);
  printf("%s\n", buffer);
}

int main() {
  printf("Tests\n");
  test_1();
  test_2();
  return 0;
}
