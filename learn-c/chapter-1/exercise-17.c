#include <stdio.h>

#define MAXLINE 1000
#define LIMIT 80

int getline_k(char line[], int maxline);

int main() {
  int len;
  char line[MAXLINE];

  while ((len = getline_k(line, MAXLINE)) > 0) {
    if (len > LIMIT) {
      printf("%d | %s\n", len, line);
    }
  }
  return 0;
}

int getline_k(char line[], int lim) {
  int c, i;

  for (i = 0; i < lim - 1 && (c = getchar()) != EOF && c != '\n'; ++i) {
    line[i] = c;
  }

  if (c == '\n') {
    line[i] = c;
    ++i;
  }

  line[i] = '\0';
  return i;
}
