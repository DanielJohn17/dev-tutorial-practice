// Package ws
package ws

import (
	"log"
	"net/http"
	"uuid"

	"github.com/gorilla/websocket"
)

type WSHandlerInt interface {
	HandleWebSocket(w http.ResponseWriter, r *http.Request)
}

type Upgrader interface {
	Upgrade(w http.ResponseWriter, r *http.Request, responseHeader http.Header) (*websocket.Conn, error)
}

type WSHandler struct {
	u   Upgrader
	hub *Hub
}

func NewWSHandler(u Upgrader, hub *Hub) *WSHandler {
	return &WSHandler{u: u, hub: hub}
}

var _ WSHandlerInt = (*WSHandler)(nil)

func (h *WSHandler) HandleWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := h.u.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("Upgrade error: %v", err)
		return
	}

	clientID := uuid.NewV7().String()

	client := NewClient(clientID, h.hub, conn)

	log.Printf("New client from handler: %s", client.id)

	h.hub.register <- client

	go client.ReadPump()
	go client.WritePump()
}
