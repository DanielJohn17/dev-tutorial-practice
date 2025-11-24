#include <stdio.h>

int main() {
  int c, lim = 100;
  char s[lim];

  for (int i = 0; i < lim - 1; ++i) {
    c = getchar();

    if (c == '\n')
      break;
    if (c == EOF)
      break;

    s[i] = c;
  }

  printf("%s\n", s);
  return 0;
}
