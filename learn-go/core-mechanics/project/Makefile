.PHONY: test bench bench-out read-pprof
test:
	go test -race -v ./...

bench:
	go test -bench=. -benchmem -benchtime=3s -cpu=1,2,4,8

bench-out:
	go test -bench=BenchmarkPipeline_throughtput -benchmem -memprofile=mem.out .

read-pprof:
	 go tool pprof -alloc_objects -text mem.out

read-pprof-meta:
	go tool pprof -alloc_objects -list AddMetaData mem.out
