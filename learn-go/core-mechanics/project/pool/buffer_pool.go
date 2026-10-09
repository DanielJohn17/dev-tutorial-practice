// Package pool
package pool

import (
	"bytes"
	"fmt"
	"sync"
	"time"

	"coreproject/cache"
)

type BufPoolInt interface {
	AddMetaData(key string, payload []byte) error
}

type BufPool struct {
	Buf sync.Pool
	ch  cache.StoreInt
}

func NewBufPool(ch cache.StoreInt) *BufPool {
	return &BufPool{
		Buf: sync.Pool{
			New: func() any {
				return new(bytes.Buffer)
			},
		},

		ch: ch,
	}
}

var _ BufPoolInt = (*BufPool)(nil)

func (bp *BufPool) AddMetaData(key string, payload []byte) error {
	b, ok := bp.Buf.Get().(*bytes.Buffer)
	if !ok {
		return fmt.Errorf("error getting buffer")
	}

	b.Reset()
	defer bp.Buf.Put(b)

	_, err := b.Write(time.Now().AppendFormat(b.AvailableBuffer(), time.RFC3339))
	if err != nil {
		return fmt.Errorf("error adding timestamp: %v", err)
	}

	_ = b.WriteByte(' ')

	if _, err := b.Write(payload); err != nil {
		return fmt.Errorf("payload error: %v", err)
	}

	bp.ch.Set(key, b.String())

	return nil
}
