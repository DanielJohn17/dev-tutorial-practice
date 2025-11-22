#include <float.h>
#include <limits.h>
#include <stdio.h>

int main() {
  printf("From <limits.h>:\n\n");

  printf("char:\t%d to %d\n", CHAR_MIN, CHAR_MAX);
  printf("uchar:\t0 to %u\n", UCHAR_MAX);

  printf("short:\t%d to %d\n", SHRT_MIN, SHRT_MAX);
  printf("ushort:\t0 to %u\n", USHRT_MAX);

  printf("int:\t%d to %d\n", INT_MIN, INT_MAX);
  printf("uint:\t0 to %u\n", UINT_MAX);

  printf("long:\t%ld to %ld\n", LONG_MIN, LONG_MAX);
  printf("ulong:\t0 to %lu\n\n", ULONG_MAX);

  printf("From <float.h>\n\n");

  printf("float:\t%e to %e\n", FLT_MIN, FLT_MAX);
  printf("double:\t%e to %e\n", DBL_MIN, DBL_MAX);
  printf("ldouble:\t%Le to %Le\n", LDBL_MIN, LDBL_MAX);

  return 0;
}
