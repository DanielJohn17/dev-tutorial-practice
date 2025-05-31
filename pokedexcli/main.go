package main

import (
	"fmt"
	"strings"
)

func main() {
	fmt.Println("Hello, World!")
}

func cleanInput(text string) []string {
	text = strings.ToLower(strings.TrimSpace(text))
	tokens := strings.Fields(text)
	return tokens
}
