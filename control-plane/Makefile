.PHONY: build run test clean migrate-up migrate-down

build:
	go build -o bin/control-plane cmd/server/main.go

run:
	go run cmd/server/main.go

test:
	go test -v ./...

clean:
	rm -rf bin/

migrate-up:
	migrate -path migrations -database "$(DATABASE_URL)" up

migrate-down:
	migrate -path migrations -database "$(DATABASE_URL)" down

migrate-create:
	migrate create -ext sql -dir migrations -seq $(name)

deps:
	go mod download
	go mod tidy

lint:
	golangci-lint run
