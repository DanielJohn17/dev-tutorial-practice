package pokecache

import (
	"fmt"
	"testing"
	"time"
)

func TestAddGetCache(t *testing.T) {
	const interval = 5 * time.Second
	cases := []struct {
		key string
		val []byte
	}{
		{
			key: "https://example.com/",
			val: []byte("example data"),
		},
		{
			key: "https://example.com/another",
			val: []byte("another example data"),
		},
	}

	for i, c := range cases {
		t.Run(fmt.Sprintf("Test case %d", i+1), func(t *testing.T) {
			cache := NewCache(interval)
			cache.Add(c.key, c.val)
			val, ok := cache.Get(c.key)
			if !ok {
				t.Errorf("Expected to find key %s in cache, but it was not found", c.key)
				return
			}
			if string(val) != string(c.val) {
				t.Errorf("Expected value %s for key %s, but got %s", c.val, c.key, val)
				return
			}
		})
	}
}
