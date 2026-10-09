package main

import (
	"fmt"

	"coreproject/cache"
	"coreproject/pool"
	"coreproject/workerpool"
)

func main() {
	c := cache.NewStore()

	bp := pool.NewBufPool(c)

	wp := workerpool.NewWorkerPool(3, bp)

	// start workers
	wp.Start()

	for i := range 10 {
		wp.Submit(&workerpool.Request{
			Key:     fmt.Sprintf("user-%d", i),
			Payload: fmt.Appendf(nil, "payload-content-%d", i),
		})
	}

	wp.Close()
	wp.Wait()

	for i := range 10 {
		key := fmt.Sprintf("user-%d", i)
		val, err := c.Get(key)
		if err != nil {
			fmt.Printf("Missing %s: %v\n", key, err)
			continue
		}
		fmt.Printf("[%s] => %s\n", key, val)
	}
}
