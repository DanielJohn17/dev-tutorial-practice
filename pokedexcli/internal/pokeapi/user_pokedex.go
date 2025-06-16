package pokeapi

type UserPokedex struct {
	Pokemons map[string]CaughtPokemonResponse
}

var userPokedex UserPokedex

func (u *UserPokedex) Add(caughtPokemon CaughtPokemonResponse) {
	if u.Pokemons == nil {
		u.Pokemons = make(map[string]CaughtPokemonResponse)
	}
	u.Pokemons[caughtPokemon.Name] = caughtPokemon
}

func ListCaughtPokemons() []CaughtPokemonResponse {
	var caughtPokemons []CaughtPokemonResponse
	for _, pokemon := range userPokedex.Pokemons {
		caughtPokemons = append(caughtPokemons, pokemon)
	}
	return caughtPokemons
}
