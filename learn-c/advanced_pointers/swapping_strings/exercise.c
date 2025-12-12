void swap_strings(char **a, char **b) {
  char *tmp = *a;
  *a = *b;
  *b = tmp;
}
