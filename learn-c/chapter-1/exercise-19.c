#include <stdio.h>

#define MAXLINE 1000

int getline_k(char line[], int maxline);
void reverse(char line[]);

int main() {
  int len;
  char line[MAXLINE];

  while ((len = getline_k(line, MAXLINE)) > 0) {
    reverse(line);

    printf("%s\n", line);
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

void reverse(char line[]) {
  int l = 0, r = 0;
  char temp;

  while (line[r] != '\0')
    ++r;

  if (r > 0 && line[r - 1] == '\n')
    --r;

  --r;

  while (l < r) {
    temp = line[l];
    line[l] = line[r];
    line[r] = temp;

    ++l;
    --r;
  }
}
