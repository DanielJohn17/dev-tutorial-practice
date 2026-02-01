package main

import (
	"fmt"
	"log"
	"os"
)

func main() {
	file, err := os.Open("messages.txt")
	if err != nil {
		log.Fatal("Can't open file: ", err)
		os.Exit(1)
	}

	defer file.Close()
	for {
		data := make([]byte, 8)

		n, err := file.Read(data)
		if err != nil {
			break
		}

		fmt.Printf("read: %s\n", string(data[:n]))
	}

}
