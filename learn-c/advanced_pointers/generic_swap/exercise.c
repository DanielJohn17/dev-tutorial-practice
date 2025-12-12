#include <stdlib.h>
#include <string.h>

void swap(void *vp1, void *vp2, size_t size) {
  void *tmp = malloc(size);

  // tmp = a
  memcpy(tmp, vp1, size);

  // a = b
  memcpy(vp1, vp2, size);

  // b = tmp
  memcpy(vp2, tmp, size);

  free(tmp);
}
