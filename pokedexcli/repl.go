package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"

	"github.com/DanielJohn17/pokedexcli/api"
)

type cliCommand struct {
	name        string
	description string
	callback    func() error
}

func start_repl() {
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

		commands := getCommands()

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
			callback:    api.CommandMap,
		},
		"mapb": {
			name:        "mapb",
			description: "Lists the name of previous 20 locations",
			callback:    api.CommandMapb,
		},
	}

	return commands
}
