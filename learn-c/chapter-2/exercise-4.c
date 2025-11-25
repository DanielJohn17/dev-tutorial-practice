#include <stdbool.h>
#include <stdio.h>

void squeeze(char s1[], char s2[]);

int main() {
  char s1[] = "This is a test";
  char s2[] = "it";

  printf("Before change: %s\n", s1);

  squeeze(s1, s2);

  printf("After squeeze: %s\n", s1);
  return 0;
}

void squeeze(char s1[], char s2[]) {
  int i = 0, j = 0, k = 0;
  bool found = false; /* Bool */

  for (; s1[i] != '\0'; i++) {
    for (; s2[j] != '\0';) {
      if (s1[i] != s2[j]) {
        found = false;
        j++;
      } else {
        found = true;
        break;
      }
    }

    if (!found) {
      s1[k++] = s1[i];
    }
    j = 0;
  }

  s1[k] = '\0';
}
