package pokeapi

import (
	"fmt"
	"io"
	"math/rand"
	"net/http"
	"time"

	"github.com/DanielJohn17/pokedexcli/internal/pokecache"
)

type CaughtPokemonResponse struct {
	Name           string  `json:"name"`
	BaseExperience int     `json:"base_experience"`
	Weight         int     `json:"weight"`
	Height         int     `json:"height"`
	Stats          []Stats `json:"stats"`
	Types          []Types `json:"types"`
}

type Stats struct {
	BaseStat int `json:"base_stat"`
	Stat     struct {
		Name string `json:"name"`
	} `json:"stat"`
}

type Types struct {
	Type struct {
		Name string `json:"name"`
	} `json:"type"`
}

func CatchPokemon(url string) error {
	var caughtPokemon CaughtPokemonResponse
	cache := pokecache.NewCache(10 * time.Second)

	if cachedData, exists := cache.Get(url); exists {
		if err := parseBody(cachedData, &caughtPokemon); err != nil {
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

	if err := parseBody(body, &caughtPokemon); err != nil {
		return err
	}

	fmt.Printf("Throwing a Pokeball at %s...\n", caughtPokemon.Name)
	if checkCatchStatus(caughtPokemon.BaseExperience) {
		fmt.Printf("%s was caught!\n", caughtPokemon.Name)
		userPokedex.Add(caughtPokemon)
		return nil
	}

	fmt.Printf("%s escaped!\n", caughtPokemon.Name)
	return nil
}

func checkCatchStatus(exp int) bool {
	num := rand.Intn(300)

	if num-exp < 20 {
		return false
	}
	return true
}
