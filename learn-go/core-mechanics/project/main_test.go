package main

import (
	"fmt"
	"strings"
	"testing"

	"coreproject/cache"
	"coreproject/pool"
	"coreproject/workerpool"
)

func TestPipLine_EndToEnd(t *testing.T) {
	const numWorkers = 5
	const numRequests = 100

	c := cache.NewStore()
	bp := pool.NewBufPool(c)
	wp := workerpool.NewWorkerPool(numWorkers, bp)

	wp.Start()

	for i := range numRequests {
		wp.Submit(&workerpool.Request{
			Key:     fmt.Sprintf("job-%d", i),
			Payload: fmt.Appendf(nil, "data-payload-%d", i),
		})
	}

	wp.Close()
	wp.Wait()

	for i := range numRequests {
		key := fmt.Sprintf("job-%d", i)
		val, err := c.Get(key)
		if err != nil {
			t.Fatalf("expected key %q in cache, but got error: %v", key, err)
		}
		expectedSubstr := fmt.Sprintf("data-payload-%d", i)
		if !strings.Contains(val, expectedSubstr) {
			t.Errorf("cache value for %q did not contain %q, got: %q", key, expectedSubstr, val)
		}
	}
}

// Benchmark throughput of the full pipline (Workerpool + sync.Pool + cache)
func BenchmarkPipeline_throughtput(b *testing.B) {
	c := cache.NewStore()
	bp := pool.NewBufPool(c)
	wp := workerpool.NewWorkerPool(8, bp)

	wp.Start()

	payload := []byte("payload-data-to-transform")

	b.ReportAllocs()

	for b.Loop() {
		wp.Submit(&workerpool.Request{
			Key:     "test-key",
			Payload: payload,
		})
	}

	wp.Close()
	wp.Wait()
}
