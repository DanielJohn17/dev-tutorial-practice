package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"websocket/test/config"
	"websocket/test/ws"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  config.ReadBufSize,
	WriteBufferSize: config.WriteBufSize,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func main() {
	hub := ws.NewHub()

	wsHandler := ws.NewWSHandler(&upgrader, hub)

	http.HandleFunc("/ws", wsHandler.HandleWebSocket)

	httpServer := &http.Server{
		Addr:         ":8080",
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	go func() {
		sigint := make(chan os.Signal, 1)
		signal.Notify(sigint, os.Interrupt, syscall.SIGTERM)
		<-sigint

		log.Println("Shutting down server...")

		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		hub.ShutDown()
		httpServer.Shutdown(ctx)
	}()

	log.Println("WebSocket server starting on :8080")
	if err := httpServer.ListenAndServe(); err != http.ErrServerClosed {
		log.Fatalf("HTTP server error: %v", err)
	}

	log.Println("Server stopped")
}
