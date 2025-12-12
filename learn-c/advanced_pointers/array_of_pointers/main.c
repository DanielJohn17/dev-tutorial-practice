#include "exercise.h"

void test_1() {
  token_t token = {"hello", 1, 1};
  token_t **result = create_token_pointer_array(&token, 1);

  printf("\tResult should not be null: %s\n",
         (result != NULL) ? "True" : "False");
  printf("\tResult[0] should not be null: %s\n",
         (result[0] != NULL) ? "True" : "False");

  printf("\tExpected literal value: %s and result literal value: %s\n", "hello",
         result[0]->literal);
  printf("\tExpected line value: %d and result line value: %d\n", 1,
         result[0]->line);
  printf("\tExpected column value: %d and result column value: %d\n", 1,
         result[0]->column);

  printf("\tResult[0] is different pointer to &token: %s\n",
         (result[0] != &token) ? "True" : "False");

  free(result[0]);
  free(result);
}

void test_2() {
  token_t tokens[3] = {{"foo", 1, 1}, {"bar", 2, 5}, {"baz", 3, 10}};
  token_t **result = create_token_pointer_array(tokens, 3);

  printf("\tResult should not be null: %s\n",
         (result != NULL) ? "True" : "False");

  for (int i = 0; i < 3; ++i) {

    printf("\n\tResult[%d] should not be null: %s\n", i,
           (result[i] != NULL) ? "True" : "False");

    printf("\tExpected literal value: %s and result literal value: %s\n",
           tokens[i].literal, result[i]->literal);
    printf("\tExpected line value: %d and result line value: %d\n",
           tokens[i].line, result[i]->line);
    printf("\tExpected column value: %d and result column value: %d\n",
           tokens[i].column, result[i]->column);

    printf("\tResult[0] is different pointer to &token: %s\n",
           (result[0] != &tokens[i]) ? "True" : "False");
  }

  for (int i = 0; i < 3; ++i) {
    free(result[i]);
  }
  free(result);
}

int main() {

  printf("Test 1\n");
  test_1();
  printf("\nTest 2\n");
  test_2();
}
