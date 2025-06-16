package pokeapi

import (
	"fmt"
	"io"
	"net/http"
	"time"

	"github.com/DanielJohn17/pokedexcli/internal/pokecache"
)

type PokemonResponse struct {
	Name              string             `json:"name"`
	PokemonEncounters []pokemonEncounter `json:"pokemon_encounters"`
}

type pokemonEncounter struct {
	Pokemon Pokemon `json:"pokemon"`
}

type Pokemon struct {
	Name string `json:"name"`
	URL  string `json:"url"`
}

func GetPokemons(url string) error {
	var pokemonResponse PokemonResponse
	cache := pokecache.NewCache(10 * time.Second)

	if cachedData, exists := cache.Get(url); exists {
		if err := parseBody(cachedData, &pokemonResponse); err != nil {
			return err
		}
	}

	response, err := http.Get(url)
	if err != nil {
		return err
	}

	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)
	if err != nil {
		return err
	}

	cache.Add(url, body)

	if err := parseBody(body, &pokemonResponse); err != nil {
		return err
	}

	fmt.Printf("Exploring %s...\n", pokemonResponse.Name)
	fmt.Println("Found Pokemon:")
	for _, encounter := range pokemonResponse.PokemonEncounters {
		fmt.Printf(" - %s\n", encounter.Pokemon.Name)
	}

	return nil
}
