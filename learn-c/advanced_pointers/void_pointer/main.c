#include "exercise.h"
#include <stdio.h>

void test_1() {
  snek_int_t integer;
  snek_float_t float_num;
  snek_bool_t boolean;

  integer.value = -100;
  float_num.value = -99.99;
  boolean.value = 255;

  snek_zero_out(&integer, INTEGER);
  snek_zero_out(&float_num, FLOAT);
  snek_zero_out(&boolean, BOOL);

  printf("\tNegative integer is zeroed out to 0: %s\n",
         (integer.value == 0) ? "True" : "False");
  printf("\tNegative float is zeroed out to 0.0: %s\n",
         (float_num.value == 0.0) ? "True" : "False");
  printf("\tNon-negative boolean is zeroed out to 0: %s\n",
         (boolean.value == 0) ? "True" : "False");
}

int main() {
  printf("Test 1\n");
  test_1();

  return 0;
}
