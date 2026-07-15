.PHONY: run build docs test tidy vet clean

BINARY=bin/todolist

run:
	go run ./cmd/main/

build:
	go build -o $(BINARY) ./cmd/main/

docs:
	swag init -g cmd/main/main.go --output docs

test:
	go test ./...

tidy:
	go mod tidy

vet:
	go vet ./...

clean:
	rm -rf $(BINARY)
