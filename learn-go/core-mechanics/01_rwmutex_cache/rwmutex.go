package main

import (
	"fmt"
	"sync"
)

type Cache struct {
	mu    sync.RWMutex
	store map[string]int
}

func NewCache() *Cache {
	return &Cache{
		store: make(map[string]int),
	}
}

func (c *Cache) Get(key string) (int, error) {
	c.mu.RLock()
	defer c.mu.RUnlock()
	value, ok := c.store[key]
	if !ok {
		return 0, fmt.Errorf("\tVALUE not found for KEY: %s", key)
	}

	return value, nil
}

func (c *Cache) Set(key string, value int) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.store[key] = value
}
