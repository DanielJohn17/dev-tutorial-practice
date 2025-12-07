#include "exercise.h"
#include <stdio.h>

void test_1() {
  packet_header_t header;
  header.tcp_header.src_port = 0x1234;
  header.tcp_header.dest_port = 0x5678;
  header.tcp_header.seq_num = 0x9ABCDEF0;

  printf("\nTest 1\n");

  printf("\tsrc_port: 0x%x\n", header.tcp_header.src_port);
  printf("\tdest_port: 0x%x\n", header.tcp_header.dest_port);
  printf("\tseq_num: 0x%x\n", header.tcp_header.seq_num);
}

void test_2() {
  packet_header_t header = {0};
  header.tcp_header.src_port = 0x1234;
  header.tcp_header.dest_port = 0x5678;
  header.tcp_header.seq_num = 0x9ABCDEF0;

  printf("\nTest 2\n");

  for (int i = 0; i < 8; ++i) {
    printf("\tRow %d data: 0x%x\n", i, header.raw[i]);
  }
}

int main() {
  printf("sizeof packet_header_t: %zu\n", sizeof(packet_header_t));

  test_1();
  test_2();

  return 0;
}
