// Package config
package config

import "time"

const (
	ReadBufSize  = 512 * 1024
	WriteBufSize = 512 * 1024

	WriteWait = 10 * time.Second

	// Maximum time to wait for a pong response
	PongWait = 60 * time.Second

	// Interval for sending ping messages (must be less than pongWait)
	PingWait = (PongWait * 9) / 10
)
