package main

import (
	"bytes"
	"errors"
	"fmt"
	"io"
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

	str := ""
	for {
		data := make([]byte, 8)

		_, err := file.Read(data)
		if err != nil {

			if errors.Is(err, io.EOF) {
				break
			}
		}

		if i := bytes.IndexByte(data, '\n'); i != -1 {
			str += string(data[:i])
			data = data[i+1:]

			fmt.Printf("read: %s\n", str)
			str = ""
		}
		str += string(data)

	}

	if len(str) != 0 {
		fmt.Printf("read: %s\n", str)
	}

}
