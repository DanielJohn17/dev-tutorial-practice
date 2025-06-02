package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

type cliCommand struct {
	name        string
	description string
	callback    func() error
}

var commands map[string]cliCommand

func init() {
	commands = map[string]cliCommand{
		"exit": {
			name:        "exit",
			description: "Exit the Pokedex",
			callback: func() error {
				fmt.Println("Closing the Pokedex... Goodbye!")
				os.Exit(0)
				return nil
			},
		},
		"help": {
			name:        "help",
			description: "Displays a help message",
			callback: func() error {
				fmt.Println("Welcome to the Pokedex!\nUsage:")
				for _, cmd := range commands {
					fmt.Printf("%s: %s\n", cmd.name, cmd.description)
				}
				return nil
			},
		},
	}
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	for {
		fmt.Print("Pokedex > ")

		if !scanner.Scan() {
			break
		}

		input := scanner.Text()

		tokens := cleanInput(input)

		if len(tokens) == 0 {
			continue
		}

		cmd, ok := commands[tokens[0]]
		if !ok {
			fmt.Println("Unknown command")
			continue
		}

		if err := cmd.callback(); err != nil {
			fmt.Printf("Error executing command '%s': %v\n", cmd.name, err)
			continue
		}
	}
}
func cleanInput(text string) []string {
	text = strings.ToLower(strings.TrimSpace(text))
	tokens := strings.Fields(text)
	return tokens
}
