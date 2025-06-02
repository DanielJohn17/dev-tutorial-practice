package pokeapi

import "fmt"

func CommandMapb() error {
	handleOffset(-42)

	url := fmt.Sprintf("https://pokeapi.co/api/v2/location-area/?offset=%d&limit=20",
		offset)

	err := getLocation(url)

	return err
}
