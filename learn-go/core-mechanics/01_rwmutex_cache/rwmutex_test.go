package main

import (
	"fmt"
	"sync"
	"testing"
	"time"
)

func Test_RWMutexCache_ConcurrentReadWrite(t *testing.T) {
	c := NewCache()
	var wg sync.WaitGroup

	// 50 concurrent readers
	for range 50 {
		wg.Go(func() {
			for j := range 1000 {
				_, _ = c.Get(fmt.Sprintf("key-%d", j%10))
			}
		})
	}

	// 50 conccurent writers
	for range 50 {
		wg.Go(func() {
			for j := range 1000 {
				c.Set(fmt.Sprintf("key-%d", j%10), 10)
			}
		})
	}

	wg.Wait()
}

func TestRWMutexCache_SimultaneousReaders(t *testing.T) {
	c := NewCache()
	c.Set("key", 10)

	reader1Holding := make(chan struct{})
	reader2Holding := make(chan struct{})

	go func() {
		c.mu.RLock()
		close(reader1Holding)             // Notify reader 2 that reader 1 holds RLock
		time.Sleep(50 * time.Millisecond) // Keep holding RLock
		c.mu.RUnlock()
	}()

	go func() {
		<-reader1Holding
		// Try reading while reader 1 is still sleeping with RLock held
		_, _ = c.Get("key")
		close(reader2Holding) // If this completes without blocking, RLock works!
	}()

	select {
	case <-reader2Holding:
		t.Log("Success: reader 2 was not blocked by reader 1")
	case <-time.After(30 * time.Millisecond):
		t.Fatal("reader 2 was blocked by reader 1 holding RLock!")
	}
}

func BenchmarkCache_RWMutex_Reads(b *testing.B) {
	c := NewCache()
	c.Set("key", 10)

	b.ResetTimer()
	b.RunParallel(func(pb *testing.PB) {
		for pb.Next() {
			_, _ = c.Get("key")
		}
	})
}
