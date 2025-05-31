package main

import "testing"

func TestCleanInput(t *testing.T) {
	cases := []struct {
		input    string
		expected []string
	}{
		{
			input:    " hello world ",
			expected: []string{"hello", "world"},
		},
		{
			input:    "  leading and trailing spaces  ",
			expected: []string{"leading", "and", "trailing", "spaces"},
		},
		{
			input:    "multiple   spaces",
			expected: []string{"multiple", "spaces"},
		},
		{
			input:    "Charmander Bulbasaur PIKACHU",
			expected: []string{"charmander", "bulbasaur", "pikachu"},
		},
	}

	for _, c := range cases {
		actual := cleanInput(c.input)

		if len(actual) != len(c.expected) {
			t.Errorf("cleanInput(%q) returned %d tokens, want %d tokens", c.input, len(actual), len(c.expected))
			continue
		}

		for i := range actual {
			word := actual[i]
			expectedWord := c.expected[i]

			if word != expectedWord {
				t.Errorf("cleanInput(%q) = %q, want %q", c.input, word, expectedWord)
			}
		}
	}
}
