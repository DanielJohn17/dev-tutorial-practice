package headers

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestHeadersParse(t *testing.T) {
	// Test: Valid single header
	headers := NewHeaders()
	data := []byte("Host: localhost:42069\r\ntestit:   tesst   \r\n\r\n")
	n, done, err := headers.Parse(data)
	require.NoError(t, err)
	require.NotNil(t, headers)

	host, ok := headers.Get("host")
	assert.True(t, ok)
	assert.Equal(t, "localhost:42069", host)

	testIt, ok := headers.Get("testit")
	assert.True(t, ok)
	assert.Equal(t, "tesst", testIt)
	assert.Equal(t, 45, n)
	assert.True(t, done)

	// Test: Multiple values
	headers = NewHeaders()
	data = []byte(
		"Host:localhost:42069\r\nSet-Person: lane-loves-go\r\nSet-Person: prime-loves-zig\r\nSet-Person: tj-loves-ocaml\r\n\r\n",
	)
	n, done, err = headers.Parse(data)
	require.NoError(t, err)
	require.NotNil(t, headers)

	setPerson, ok := headers.Get("Set-Person")
	assert.True(t, ok)
	require.Equal(t, "lane-loves-go, prime-loves-zig, tj-loves-ocaml", setPerson)
	require.Equal(t, 108, n)
	require.True(t, done)

	// Test: Invalid spacing header
	headers = NewHeaders()
	data = []byte("       Host : localhost:42069       \r\n\r\n")
	n, done, err = headers.Parse(data)
	require.Error(t, err)
	assert.Equal(t, 0, n)
	assert.False(t, done)

	// Test: Invalid name token
	headers = NewHeaders()
	data = []byte("H©st: localhost:42069\r\n\r\n")
	n, done, err = headers.Parse(data)
	require.Error(t, err)
	assert.Equal(t, 0, n)
	assert.False(t, done)
}
