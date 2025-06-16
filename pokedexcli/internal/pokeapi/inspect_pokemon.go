package pokeapi

import "fmt"

func InspectPokemon(name string) error {
	if pokemon, exists := userPokedex.Pokemons[name]; exists {
		fmt.Printf(
			"Name: %s\nHeight: %d\nWeight: %d\n",
			pokemon.Name,
			pokemon.Height,
			pokemon.Weight,
		)

		fmt.Println("Stats:")
		for _, stat := range pokemon.Stats {
			fmt.Printf("  -%s: %d\n", stat.Stat.Name, stat.BaseStat)
		}

		fmt.Println("Types:")
		for _, types := range pokemon.Types {
			fmt.Printf("  - %s\n", types.Type.Name)
		}
		return nil
	}

	fmt.Println("you have not caught that pokemon")
	return nil
}
