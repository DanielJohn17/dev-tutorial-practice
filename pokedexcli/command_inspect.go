package main

import (
	"fmt"

	"github.com/DanielJohn17/pokedexcli/internal/pokeapi"
)

func commandInspect(args []string) error {
	if len(args) < 1 {
		return fmt.Errorf("pokemon name is required")
	}

	pokemonName := args[0]
	if err := pokeapi.InspectPokemon(pokemonName); err != nil {
		return fmt.Errorf("error inspecting pokemon: %w", err)
	}

	return nil
}
