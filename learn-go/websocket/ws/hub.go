package ws

import (
	"context"
	"log"
	"sync"
)

type HubInt interface {
	Run()
	ShutDown()
}

type Hub struct {
	clients map[string]*Client

	brodcast chan []byte

	register chan *Client

	unregister chan *Client

	ctx    context.Context
	cancel context.CancelFunc
	mu     sync.RWMutex
}

func NewHub() *Hub {
	ctx, cancel := context.WithCancel(context.Background())
	h := &Hub{
		clients:    make(map[string]*Client),
		brodcast:   make(chan []byte, 256),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		ctx:        ctx,
		cancel:     cancel,
	}

	go h.Run()

	return h
}

var _ HubInt = (*Hub)(nil)

func (h *Hub) Run() {
	for {
		select {
		case <-h.ctx.Done():
			h.mu.Lock()
			for _, client := range h.clients {
				close(client.send)
			}

			h.clients = nil
			h.mu.Unlock()
			return

		case client := <-h.register:
			h.mu.Lock()
			h.clients[client.id] = client
			h.mu.Unlock()

			log.Printf("Client registered: %s (total: %d)\n", client.id, len(h.clients))
		case client := <-h.unregister:
			h.mu.Lock()
			if _, ok := h.clients[client.id]; ok {
				close(client.send)
				delete(h.clients, client.id)
			}
			h.mu.Unlock()

			log.Printf("Client unregistered: %s (total: %d)\n", client.id, len(h.clients))

		case message := <-h.brodcast:
			h.mu.RLock()
			for id, client := range h.clients {
				select {
				case client.send <- message:
				default:
					log.Printf("Client %s send buffer full, disconnecting\n", id)

					go func(c *Client) {
						h.unregister <- c
					}(client)
				}
			}
		}
	}
}

func (h *Hub) ShutDown() {
	h.cancel()
}
