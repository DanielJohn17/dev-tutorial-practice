package main

import (
	"fmt"
	"testing"
	"time"
)

func TestWorkerPool_ProcessAll(t *testing.T) {
	jh := NewJobHandler(5)

	jh.WorkerPool()

	for i := range 5000 {
		jh.jobs <- &Data{
			ID:   i,
			Name: fmt.Sprintf("Name-%d", i),
		}
	}

	close(jh.jobs)

	jh.wg.Wait()
	if jh.processed.Load() != 5000 {
		t.Fatalf("expected 5000 processed, got %d", jh.processed.Load())
	}
}

func TestWorkerPool_EarlyExit(t *testing.T) {
	jh := NewJobHandler(5)

	jh.WorkerPool()

	// Producer sends jobs continuously until 'done' is closed
	go func() {
		for i := 0; ; i++ {
			select {
			case <-jh.done:
				return
			case jh.jobs <- &Data{
				ID:   i,
				Name: fmt.Sprintf("Name-%d", i),
			}:
			}
		}
	}()

	<-time.After(10 * time.Millisecond)
	close(jh.done)

	// verify that all workers exit promptly without hanging/deadlock
	doneCh := make(chan struct{})
	go func() {
		jh.wg.Wait()
		close(doneCh)
	}()

	select {
	case <-doneCh:
	// Success: all worker goroutiens returned
	case <-time.After(1 * time.Second):
		t.Fatal("worker pool deadlock: worker did not exit after close(done)")
	}

	t.Logf("Early exit verified: halted after processing %d jobs", jh.processed.Load())
}
