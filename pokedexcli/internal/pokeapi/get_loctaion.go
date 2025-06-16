package pokeapi

import (
	"fmt"
	"io"
	"net/http"
	"time"

	"github.com/DanielJohn17/pokedexcli/internal/pokecache"
)

type LocationAreaResponse struct {
	Next    string         `json:"next"`
	Prvious string         `json:"previous"`
	Results []LocationArea `json:"results"`
}

type LocationArea struct {
	Name string `json:"name"`
	URL  string `json:"url"`
}

var LocationAreaResponseVar LocationAreaResponse

func GetLocation(url string) error {

	cache := pokecache.NewCache(10 * time.Second)

	if cachedData, exists := cache.Get(url); exists {
		if err := parseBody(cachedData, &LocationAreaResponseVar); err != nil {
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
	if err := parseBody(body, &LocationAreaResponseVar); err != nil {
		return err
	}

	for _, area := range LocationAreaResponseVar.Results {
		fmt.Println(area.Name)
	}

	return nil
}
