package main

import (
	"fmt"
	"log"
	"net"

	"tcptohttp.danieljohn17/internal/request"
)

func main() {
	listener, err := net.Listen("tcp4", ":42069")

	if err != nil {
		log.Fatal("connection error", err)
	}

	defer listener.Close()
	for {
		conn, err := listener.Accept()
		if err != nil {
			log.Fatal("connection error", err)
		}

		req, err := request.RequestFromReader(conn)
		if err != nil {

			log.Fatal("connection error", err)
		}

		fmt.Printf("Request line:\n")
		fmt.Printf("- target: %s\n", req.RequestLine.RequestTarget)
		fmt.Printf("- method: %s\n", req.RequestLine.Method)
		fmt.Printf("- version: %s\n", req.RequestLine.HttpVersion)
	}
}
