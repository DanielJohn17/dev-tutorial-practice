#include <stdio.h>

#define MAXWORD 20
#define OVERFLOW 21

int main() {
  int c, len = 0;
  int count[OVERFLOW + 1] = {0};

  while ((c = getchar()) != EOF)
    if (c == ' ' || c == '\t' || c == '\n') {
      if (len > 0) {
        if (len <= MAXWORD) {
          count[len]++;
        } else {
          count[OVERFLOW]++;
        }
        len = 0;
      }
    } else {
      len++;
    }

  printf("Horizontal Histogram\n");
  for (int i = 1; i <= MAXWORD; i++) {
    printf("%2d | ", i);
    for (int j = 0; j <= count[i]; j++) {
      putchar('*');
    }
    printf(" (%d)\n", count[i]);
  }

  if (count[OVERFLOW] > 0) {
    printf(">%2d | ", MAXWORD);
    for (int j = 0; j < count[OVERFLOW]; j++)
      putchar('*');
    printf(" (%d)\n", count[OVERFLOW]);
  }
}
