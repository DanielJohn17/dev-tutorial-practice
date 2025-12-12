#include "exercise.h"

typedef struct test {
  UINT num;
  UINT size;
} test_t;

void test_1() {
  int i1 = 1234;
  int i2 = 5678;

  swap(&i1, &i2, sizeof(int));

  printf("\ti1 is %d: %s\n", 5678, (i1 == 5678) ? "True" : "False");
  printf("\ti2 is %d: %s\n", 1234, (i2 == 1234) ? "True" : "False");
}

void test_2() {
  char *s1 = "dax";
  char *s2 = "adam";

  swap(&s1, &s2, sizeof(char *));

  printf("\ts1 is %s: %s\n", "adam",
         strcmp(s1, "adam") == 0 ? "True" : "False");
  printf("\ts2 is %s: %s\n", "dax", strcmp(s2, "dax") == 0 ? "True" : "False");
}

void test_3() {
  test_t test1 = {10, 20};
  test_t test2 = {30, 40};

  swap(&test1, &test2, sizeof(test_t));

  printf("\ttest1.num is %d: %s\n", 30, (test1.num == 30) ? "True" : "False");
  printf("\ttest1.size is %d: %s\n", 40, (test1.size == 40) ? "True" : "False");

  printf("\n\ttest2.num is %d: %s\n", 10, (test2.num == 10) ? "True" : "False");
  printf("\ttest2.size is %d: %s\n", 20, (test2.size == 20) ? "True" : "False");
}

int main() {
  printf("Test 1\n");
  test_1();

  printf("\nTest 2\n");
  test_2();

  printf("\nTest 3\n");
  test_3();

  return 0;
}
