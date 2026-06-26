package main

import (
	"fmt"
	"math/rand"
	"sync"
	"time"
)

type OrderStatus string

const (
	StatusPending   OrderStatus = "pending"
	StatusShipped   OrderStatus = "shipped"
	StatusDelivered OrderStatus = "delivered"
	StatusCancelled OrderStatus = "cancelled"
)

// Order — mu guards concurrent access to status (read by reportOrderStatus, written by updateOrder)
type Order struct {
	Id     int
	status OrderStatus
	mu     sync.Mutex
}

func main() {
	wg := sync.WaitGroup{}
	msgChan := make(chan string)

	orders := generateOrders(20)

	processOrders(orders)

	// Both updateOrder and reportOrderStatus are tracked by the same WaitGroup
	// so the close goroutine only fires after ALL senders finish.
	// Without this, reportOrderStatus was launched with plain `go` and the close
	// goroutine (which only waited for updateOrder) could fire before reporters
	// sent on msgChan, causing a send-on-closed-channel panic.

	for _, order := range orders {
		wg.Go(func() {
			updateOrder(order)
		})
	}

	for _, order := range orders {
		wg.Go(func() {
			reportOrderStatus(order, msgChan)
		})
	}

	// The close goroutine runs concurrently BEFORE the range loop below.
	// In the original code, close(msgChan) was placed AFTER `for msg := range msgChan`,
	// which blocked the main goroutine forever — the close was unreachable.
	go func() {
		wg.Wait()
		close(msgChan)
	}()

	for msg := range msgChan {
		fmt.Print(msg)
	}

	fmt.Println("All opertaions are completed.")
}

func processOrders(orders []*Order) {
	for _, order := range orders {
		time.Sleep(time.Duration(rand.Int31n(500)) * time.Millisecond)

		fmt.Printf("Processing Order: %d\n", order.Id)
	}
}

func updateOrder(order *Order) {

	time.Sleep(time.Duration(rand.Int31n(500)) * time.Millisecond)

	status := []OrderStatus{
		"shipped", "cancelled", "delivered",
	}[rand.Int31n(3)]

	// Write status under lock to avoid data race with updateOrder
	order.mu.Lock()
	defer order.mu.Unlock()

	order.status = status

	fmt.Printf("Updated order %d status: %s\n", order.Id, order.status)
}

func generateOrders(count int) []*Order {
	orders := make([]*Order, count)

	for i := range count {
		orders[i] = &Order{Id: i + 1, status: "pending"}
	}

	return orders
}

func reportOrderStatus(order *Order, msgChan chan<- string) {
	time.Sleep(1 * time.Second)

	// Read status under lock to avoid data race with updateOrder
	order.mu.Lock()
	defer order.mu.Unlock()
	status := order.status

	var msg string
	msg += fmt.Sprintln("\n---Order Status Report---")
	msg += fmt.Sprintf("Order %d: %s\n", order.Id, status)
	msg += fmt.Sprintln("-----------------------------")

	msgChan <- msg
}
