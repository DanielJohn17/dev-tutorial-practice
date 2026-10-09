// Package workerpool
package workerpool

import (
	"sync"

	"coreproject/pool"
)

type Request struct {
	Key     string
	Payload []byte
}

type WorkerPoolInt interface {
	Start()
	Submit(req *Request)
	Wait()
	Close()
}

type WorkerPool struct {
	done    chan struct{}
	jobs    chan *Request
	workers int
	bp      pool.BufPoolInt

	wg   sync.WaitGroup
	once sync.Once
}

func NewWorkerPool(workers int, bp pool.BufPoolInt) *WorkerPool {
	return &WorkerPool{
		done:    make(chan struct{}),
		jobs:    make(chan *Request, 256),
		workers: workers,
		bp:      bp,
	}
}

var _ WorkerPoolInt = (*WorkerPool)(nil)

func (w *WorkerPool) Start() {
	for range w.workers {
		w.wg.Add(1)
		go w.worker(&w.wg)
	}
}

func (w *WorkerPool) Submit(req *Request) {
	w.jobs <- req
}

func (w *WorkerPool) Wait() {
	w.wg.Wait()
}

func (w *WorkerPool) Close() {
	w.once.Do(func() {
		close(w.jobs)
	})
}

func (w *WorkerPool) worker(wg *sync.WaitGroup) {
	defer wg.Done()
	for {
		select {
		case <-w.done:
			// w.Close()
			return
		case req, ok := <-w.jobs:
			if !ok {
				// w.Close()
				return
			}
			if err := w.bp.AddMetaData(req.Key, req.Payload); err != nil {
				return
			}
		}
	}
}
