package main

import (
	"sync"
	"sync/atomic"
)

type Data struct {
	ID   int
	Name string
}

type JobHandler struct {
	done      chan struct{}
	jobs      chan *Data
	workers   int
	wg        sync.WaitGroup
	processed atomic.Int64
}

func NewJobHandler(workers int) *JobHandler {
	jh := &JobHandler{
		done:    make(chan struct{}),
		jobs:    make(chan *Data, 256),
		workers: workers,
	}

	jh.processed.Store(0)

	return jh
}

func (j *JobHandler) WorkerPool() {
	for range j.workers {
		j.wg.Go(func() {
			for {
				select {
				case <-j.done:
					return
				case data, ok := <-j.jobs:
					if !ok {
						return
					}
					_, _ = data.ID, data.Name
					j.processed.Add(1)
				}
			}
		})
	}
}
