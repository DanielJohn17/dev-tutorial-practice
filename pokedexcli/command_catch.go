package main

import (
	"fmt"

	"github.com/DanielJohn17/pokedexcli/internal/pokeapi"
)

func commandCatch(args []string) error {
	if len(args) < 1 {
		return fmt.Errorf("Usage: catch <pokemon_name>")
	}

	url := pokeapi.BaseURL + "/pokemon/" + args[0]

	if err := pokeapi.CatchPokemon(url); err != nil {
		return err
	}

	return nil
}
