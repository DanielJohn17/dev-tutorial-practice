package main

import (
	"fmt"

	"github.com/DanielJohn17/pokedexcli/internal/pokeapi"
)

func commandExplore(args []string) error {

	if len(args) < 1 {
		return fmt.Errorf("Usage: explore <location-area-name>")
	}
	url := pokeapi.BaseURL + "/location-area/" + args[0]

	if err := pokeapi.GetPokemons(url); err != nil {
		return err
	}

	return nil
}
