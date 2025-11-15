#include <stdio.h>

#define SIZE 26 * 2
#define OVERFLOW SIZE + 1

int main() {
  int c, index = 0;
  int counts[OVERFLOW + 1] = {0};

  while ((c = getchar()) != EOF) {
    if (c >= 65 && c <= 122) {
      if (c >= 97 && c <= 122) {
        index = c - 70;
      } else {
        index = c - 65;
      }
      counts[index]++;
    } else {
      counts[SIZE + 1]++;
    }
  }

  printf("Horizontal Histogram.\n");
  for (int i = 0; i <= SIZE; i++) {
    if (i <= 26)
      printf("%c | ", i + 65);
    else
      printf("%c | ", i + 70);

    for (int j = 0; j <= counts[i]; j++) {
      putchar('*');
    }
    printf(" (%d)\n", counts[i]);
  }

  printf("Other | ");
  for (int i = 0; i <= counts[SIZE + 1]; i++) {
    putchar('*');
  }
  printf(" (%d)\n", counts[SIZE + 1]);

  return 0;
}
