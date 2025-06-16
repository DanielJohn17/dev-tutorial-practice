package main

import (
	"fmt"

	"github.com/DanielJohn17/pokedexcli/internal/pokeapi"
)

func commandPokedex(_ []string) error {
	fmt.Println("Your Pokedex:")

	for _, pokemon := range pokeapi.ListCaughtPokemons() {
		fmt.Printf("  - %s\n", pokemon.Name)
	}
	return nil
}
