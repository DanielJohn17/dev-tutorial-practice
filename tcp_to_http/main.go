package main

import (
	"bytes"
	"errors"
	"fmt"
	"io"
	"log"
	"os"
)

func getLinesChannel(f io.ReadCloser) <-chan string {
	out := make(chan string, 1)

	go func() {
		defer f.Close()
		defer close(out)

		str := ""
		for {
			data := make([]byte, 8)

			_, err := f.Read(data)
			if err != nil {
				if errors.Is(err, io.EOF) {
					break
				}
			}

			if i := bytes.IndexByte(data, '\n'); i != -1 {
				str += string(data[:i])

				out <- str
				data = data[i+1:]
				str = ""
			}

			str += string(data)
		}

		if len(str) != 0 {
			out <- str
		}
	}()

	return out
}

func main() {
	file, err := os.Open("messages.txt")
	if err != nil {
		log.Fatal("Can't open file: ", err)
		os.Exit(1)
	}

	lines := getLinesChannel(file)

	for line := range lines {
		fmt.Printf("read: %s\n", line)
	}
}
