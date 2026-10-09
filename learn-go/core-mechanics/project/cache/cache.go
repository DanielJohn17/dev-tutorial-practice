// Package cache
package cache

import (
	"fmt"
	"sync"
)

type User struct {
	ID   int
	Name string
}

type StoreInt interface {
	Get(key string) (string, error)
	Set(key string, value string)
}

type Store struct {
	Data map[string]string
	mu   sync.RWMutex
}

func NewStore() *Store {
	return &Store{
		Data: make(map[string]string),
	}
}

var _ StoreInt = (*Store)(nil)

func (s *Store) Get(key string) (string, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	payload, ok := s.Data[key]
	if !ok {
		return "", fmt.Errorf("user not found with key: %s", key)
	}

	return payload, nil
}

func (s *Store) Set(key string, value string) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.Data[key] = value
}
