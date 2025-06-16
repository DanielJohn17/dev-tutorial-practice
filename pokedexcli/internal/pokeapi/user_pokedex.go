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
