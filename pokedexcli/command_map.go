package main

import (
	"github.com/DanielJohn17/pokedexcli/internal/pokeapi"
)

var url string

func commandMapf(_ []string) error {

	if url == "" {
		url = pokeapi.BaseURL + "/location-area/"
	}

	_, nextUrl, err := pokeapi.GetLocation(url)
	if err != nil {
		return err
	}
	url = nextUrl

	return nil
}

func commandMapb(_ []string) error {

	if url == "" {
		url = pokeapi.BaseURL + "/location-area/"
	}

	prevUrl, _, err := pokeapi.GetLocation(url)
	if err != nil {
		return err
	}

	url = prevUrl

	return nil
}
