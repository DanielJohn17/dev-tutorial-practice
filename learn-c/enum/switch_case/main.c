#include "http.h"
#include <stdio.h>

int main() {
  printf("%s\n", http_to_str(HTTP_BAD_REQUEST));
  printf("%s\n", http_to_str(HTTP_UNAUTHORIZED));
  printf("%s\n", http_to_str(HTTP_INTERNAL_SERVER_ERROR));
  printf("%s\n", http_to_str(HTTP_NOT_FOUND));
  printf("%s\n", http_to_str(HTTP_TEAPOT));

  return 0;
}
