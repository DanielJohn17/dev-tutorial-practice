package main

import (
	"fmt"
	"os"
	"sync"
	"testing"
)

// Global sinks to eliminate compiler deadcode optimization
var (
	writeLen int
	writeErr error
)

// tests
func TestBufWithPool_Correctness(t *testing.T) {
	w, err := openFile()
	if err != nil {
		t.Fatal("error opening file")
	}
	defer func() { _ = w.Close() }()

	n, err := BufWithPool(w, "foo", "bar")
	if err != nil {
		t.Fatalf("error in write: %v", err)
	}

	expectedLen := len([]byte("foo=bar"))

	if n != expectedLen {
		t.Fatalf("expected output to contain 'foo=bar' length of %d got: %d", expectedLen, n)
	}

	_ = removeFile()
}

func TestBufWithPool_concurrencyIntegrity(t *testing.T) {
	const goroutines = 20
	const iterations = 500

	w, err := openFile()
	if err != nil {
		t.Fatal("error opening file")
	}

	defer func() { _ = w.Close() }()
	var wg sync.WaitGroup

	wg.Add(goroutines)

	for i := range goroutines {
		go func(id int) {
			defer wg.Done()

			expectedVal := fmt.Sprintf("val-%d", id)
			expectedKey := fmt.Sprintf("key-%d", id)

			for range iterations {
				n, err := BufWithPool(w, expectedKey, expectedVal)
				if err != nil {
					t.Errorf("error in write: %v", err)
				}

				expectedLen := len(fmt.Sprintf("%s=%s", expectedKey, expectedVal))

				if n != expectedLen {
					t.Errorf("expected output to contain length: %d, but got: %d", expectedLen, n)
					return
				}
			}
		}(i)
	}

	wg.Wait()
	_ = removeFile()
}

// Benchmarks
func BenchmarkBufWithoutPool(b *testing.B) {
	w, err := openFile()
	if err != nil {
		b.Fatal("error opening file")
	}
	defer func() { _ = w.Close() }()

	b.ResetTimer()
	b.RunParallel(func(pb *testing.PB) {
		for pb.Next() {
			writeLen, writeErr = BufWithoutPool(w, "key", "value")
		}
	})

	_ = removeFile()
}

func BenchmarkBufWithPool(b *testing.B) {
	w, err := openFile()
	if err != nil {
		b.Fatal("error opening file")
	}
	defer func() { _ = w.Close() }()

	b.ResetTimer()
	b.RunParallel(func(pb *testing.PB) {
		for pb.Next() {
			writeLen, writeErr = BufWithPool(w, "key", "value")
		}
	})

	_ = removeFile()
}

// helper functions
func openFile() (*os.File, error) {
	f, err := os.Create("buf.log")
	if err != nil {
		return nil, err
	}

	return f, nil
}

func removeFile() error {
	if err := os.Remove("buf.log"); err != nil {
		return err
	}

	return nil
}
