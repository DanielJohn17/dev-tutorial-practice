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
	callback    func(args []string) error
}

func start_repl() {
	scanner := bufio.NewScanner(os.Stdin)
	commands := getCommands()

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

		if err := cmd.callback(tokens[1:]); err != nil {
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

func getCommands() map[string]cliCommand {
	commands := map[string]cliCommand{
		"exit": {
			name:        "exit",
			description: "Exit the Pokedex",
			callback:    commandExit,
		},
		"help": {
			name:        "help",
			description: "Displays a help message",
			callback:    commandHelp,
		},
		"map": {
			name:        "map",
			description: "Lists 20 name of locations",
			callback:    commandMapf,
		},
		"mapb": {
			name:        "mapb",
			description: "Lists the name of previous 20 locations",
			callback:    commandMapb,
		},
		"explore": {
			name:        "explore",
			description: "Explore a Pokemon by name",
			callback:    commandExplore,
		},
		"catch": {
			name:        "catch",
			description: "Catch a Pokemon by name",
			callback:    commandCatch,
		},
		"inspect": {
			name:        "inspect",
			description: "Inspect a Pokemon by name",
			callback:    commandInspect,
		},
	}

	return commands
}
