#include <stdio.h>

#include "limits.h"

typedef union {
  int value;
  unsigned int err;
} val_or_err_t;

int main() {
  val_or_err_t lanes_score = {.value = -420};
  printf("value (set): %d\n", lanes_score.value);
  printf("err (unset): %u\n", lanes_score.err);

  val_or_err_t teejs_score = {.err = UINT_MAX};
  printf("value (unset): %d\n", teejs_score.value);
  printf("err (set): %u\n", teejs_score.err);
}

/*
 * Notice that now we set the .err field (an unsigned integer) to UINT_MAX,
 * which is a constant representing the largest possible unsigned integer
 * (4294967295 in my case). As expected, the .err field prints 4294967295.
 * However, the .value field prints -1! It's interpreting the bytes that
 * represent 4294967295 as an unsigned integer as a signed integer, which is -1.
 */

/*
 * Basically do not access the value that is not set in unions.
 */
