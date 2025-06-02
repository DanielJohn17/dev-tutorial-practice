package pokeapi

import (
	"fmt"
)

func CommandMap() error {

	url := fmt.Sprintf("https://pokeapi.co/api/v2/location-area/?offset=%d&limit=20",
		offset)

	err := getLocation(url)
	handleOffset(21)

	return err
}
