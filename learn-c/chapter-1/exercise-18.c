#include <stdio.h>

#define MAXLINE 1000

int getline_k(char line[], int maxline);
void trim(char line[]);

int main() {
  int len;
  char line[MAXLINE];

  while ((len = getline_k(line, MAXLINE)) > 0) {
    trim(line);

    if (line[0] != '\0') {
      printf("%s\n", line);
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

void trim(char line[]) {
  int i = 0;

  while (line[i] != '\0')
    ++i;

  --i;

  while (i >= 0 && (line[i] == ' ' || line[i] == '\n' || line[i] == '\t')) {
    --i;
  }

  if (i < 0) {
    line[0] = '\0';
  } else {
    // add them back
    line[++i] = '\n';
    line[++i] = '\0';
  }
}
