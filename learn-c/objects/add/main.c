#include "snekobject.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void test_integer_add(void) {
  snek_object_t *one = new_snek_integer(1);
  snek_object_t *three = new_snek_integer(3);
  snek_object_t *four = snek_add(one, three);

  printf("\tResult is not null: %s\n", (four != NULL) ? "True" : "False");
  printf("\tResult is integer: %s\n",
         (four->kind == INTEGER) ? "True" : "False");
  printf("\t1 + 3 = 4: %s\n", (four->data.v_int == 4) ? "True" : "False");

  free(one);
  free(three);
  free(four);
}

void test_float_add(void) {
  snek_object_t *one = new_snek_float(1.5);
  snek_object_t *three = new_snek_float(3.5);
  snek_object_t *five = snek_add(one, three);

  printf("\tResult is not null: %s\n", (five != NULL) ? "True" : "False");
  printf("\tResult is float: %s\n", (five->kind == FLOAT) ? "True" : "False");
  printf("\t1.5 + 3.5 = 5.0: %s\n",
         (five->data.v_float == 1.5 + 3.5) ? "True" : "False");

  free(one);
  free(three);
  free(five);
}

void test_string_add(void) {
  snek_object_t *hello = new_snek_string("hello");
  snek_object_t *world = new_snek_string(", world");
  snek_object_t *greeting = snek_add(hello, world);

  printf("\tResult is not null: %s\n", (greeting != NULL) ? "True" : "False");
  printf("\tResult is string: %s\n",
         (greeting->kind == STRING) ? "True" : "False");
  printf("\tStrings concatenated: %s\n",
         (strcmp(greeting->data.v_string, "hello, world") == 0) ? "True"
                                                                : "False");

  free(hello->data.v_string);
  free(hello);
  free(world->data.v_string);
  free(world);
  free(greeting->data.v_string);
  free(greeting);
}

void test_string_add_self(void) {
  snek_object_t *repeated = new_snek_string("(repeated)");
  snek_object_t *result = snek_add(repeated, repeated);

  printf("\tResult is not null: %s\n", (result != NULL) ? "True" : "False");
  printf("\tResult is string: %s\n",
         (result->kind == STRING) ? "True" : "False");
  printf("\tStrings concatenated correctly: %s\n",
         (strcmp(result->data.v_string, "(repeated)(repeated)") == 0)
             ? "True"
             : "False");

  free(repeated->data.v_string);
  free(repeated);
  free(result->data.v_string);
  free(result);
}

void test_vector3_add(void) {
  snek_object_t *one = new_snek_float(1.0);
  snek_object_t *two = new_snek_float(2.0);
  snek_object_t *three = new_snek_float(3.0);
  snek_object_t *four = new_snek_float(4.0);
  snek_object_t *five = new_snek_float(5.0);
  snek_object_t *six = new_snek_float(6.0);

  snek_object_t *v1 = new_snek_vector3(one, two, three);
  snek_object_t *v2 = new_snek_vector3(four, five, six);
  snek_object_t *result = snek_add(v1, v2);

  printf("\tResult is not null: %s\n", (result != NULL) ? "True" : "False");
  printf("\tResult is vector3: %s\n",
         (result->kind == VECTOR3) ? "True" : "False");
  printf("\tX component is 5.0: %s\n",
         (result->data.v_vector3.x->data.v_float == 5.0) ? "True" : "False");
  printf("\tY component is 7.0: %s\n",
         (result->data.v_vector3.y->data.v_float == 7.0) ? "True" : "False");
  printf("\tZ component is 9.0: %s\n",
         (result->data.v_vector3.z->data.v_float == 9.0) ? "True" : "False");

  free(v1->data.v_vector3.x);
  free(v1->data.v_vector3.y);
  free(v1->data.v_vector3.z);
  free(v1);

  free(v2->data.v_vector3.x);
  free(v2->data.v_vector3.y);
  free(v2->data.v_vector3.z);
  free(v2);

  free(result->data.v_vector3.x);
  free(result->data.v_vector3.y);
  free(result->data.v_vector3.z);
  free(result);
}

void test_array_add(void) {
  snek_object_t *one = new_snek_integer(1);
  snek_object_t *ones = new_snek_array(2);
  snek_array_set(ones, 0, one);
  snek_array_set(ones, 1, one);

  snek_object_t *hi = new_snek_string("hi");
  snek_object_t *hellos = new_snek_array(3);
  snek_array_set(hellos, 0, hi);
  snek_array_set(hellos, 1, hi);
  snek_array_set(hellos, 2, hi);

  snek_object_t *result = snek_add(ones, hellos);

  printf("\tResult is not null: %s\n", (result != NULL) ? "True" : "False");
  printf("\tResult is array: %s\n", (result->kind == ARRAY) ? "True" : "False");

  snek_object_t *first = snek_array_get(result, 0);
  printf("\tFirst item is not null: %s\n", (first != NULL) ? "True" : "False");
  printf("\tFirst item is int with value 1: %s\n",
         (first != NULL && first->data.v_int == 1) ? "True" : "False");

  snek_object_t *third = snek_array_get(result, 2);
  printf("\tThird item is not null: %s\n", (third != NULL) ? "True" : "False");
  printf("\tThird item is 'hi': %s\n",
         (third != NULL && strcmp(third->data.v_string, "hi") == 0) ? "True"
                                                                    : "False");

  free(one);
  free(ones->data.v_array.elements);
  free(ones);

  free(hi->data.v_string);
  free(hi);
  free(hellos->data.v_array.elements);
  free(hellos);
  free(result->data.v_array.elements);
  free(result);
}

int main(void) {
  printf("Test 1: Integer add\n");
  test_integer_add();

  printf("\nTest 2: Float add\n");
  test_float_add();

  printf("\nTest 3: String add\n");
  test_string_add();

  printf("\nTest 4: String add self\n");
  test_string_add_self();

  printf("\nTest 5: Vector3 add\n");
  test_vector3_add();

  printf("\nTest 6: Array add\n");
  test_array_add();

  return 0;
}
