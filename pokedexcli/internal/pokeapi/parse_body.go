package pokeapi

import "encoding/json"

func parseBody[T any](body []byte, v *T) error {
	return json.Unmarshal(body, v)
}
