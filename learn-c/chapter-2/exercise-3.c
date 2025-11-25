#include <stdio.h>

int htoi(char s[]);
int hexval(char c);

int main() {
  printf("%d\n", htoi("0x10"));
  printf("%d\n", htoi("0x1Fa"));
  printf("%d\n", htoi("0X10"));
  printf("%d\n", htoi("AF"));
  printf("%d\n", htoi("1cff"));
  return 0;
}

int htoi(char s[]) {
  int i = 0, n = 0;

  if (s[0] == '0' && (s[1] == 'x' || s[1] == 'X')) {
    i = 2;
  }

  while (s[i] != '\0') {
    if (hexval(s[i]) == -1)
      break;
    else
      n = (n * 16) + hexval(s[i]);
    ++i;
  }

  return n;
}

int hexval(char c) {
  if (c >= '0' && c <= '9')
    return c - '0';
  if (c >= 'A' && c <= 'F')
    return c - 'A' + 10; /* returns 11 if c = B */
  if (c >= 'a' && c <= 'f')
    return c - 'a' + 10;
  return -1;
}
