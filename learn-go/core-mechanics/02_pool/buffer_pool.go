package main

import (
	"bytes"
	"io"
	"sync"
)

var bufPool = sync.Pool{
	New: func() any {
		return new(bytes.Buffer)
	},
}

func BufWithoutPool(w io.Writer, key, val string) (int, error) {
	buf := new(bytes.Buffer)
	buf.Reset()

	addToBuffer(buf, key, val)

	n, err := w.Write(buf.Bytes())
	if err != nil {
		return 0, err
	}

	return n, nil
}

func BufWithPool(w io.Writer, key, val string) (int, error) {
	buf, _ := bufPool.Get().(*bytes.Buffer)
	buf.Reset()
	defer bufPool.Put(buf)

	addToBuffer(buf, key, val)

	n, err := w.Write(buf.Bytes())
	if err != nil {
		return 0, err
	}

	return n, nil
}

func addToBuffer(b *bytes.Buffer, key, val string) {
	b.WriteString(key)
	b.WriteByte('=')
	b.WriteString(val)
}
