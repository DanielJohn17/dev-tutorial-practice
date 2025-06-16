package main

import "github.com/DanielJohn17/pokedexcli/internal/pokeapi"

var locationAreaResponse = pokeapi.LocationAreaResponseVar

func commandMapf(_ []string) error {
	var url string
	if locationAreaResponse.Next == "" {
		url = pokeapi.BaseURL + "/location-area/"
	} else {
		url = locationAreaResponse.Next
	}

	err := pokeapi.GetLocation(url)

	return err
}

func commandMapb(_ []string) error {
	var url string
	if locationAreaResponse.Prvious == "" {
		url = pokeapi.BaseURL + "/location-area/"
	} else {
		url = locationAreaResponse.Prvious
	}

	err := pokeapi.GetLocation(url)

	return err
}
