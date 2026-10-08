.PHONY: test bench
test:
	go test -race -v ./...
bench:
	go test -bench=. -benchmem -benchtime=3s -cpu=1,2,4,8
