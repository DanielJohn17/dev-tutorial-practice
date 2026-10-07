.PHONY: test bench
test: 
	@printf "Run test file"
	go test -race -v ./...

bench:
	go test -bench=BenchmarkCache -benchtime=3s -cpu=1,2,4,8
