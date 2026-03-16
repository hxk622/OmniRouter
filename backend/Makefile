.PHONY: build dev generate test test-unit test-integration test-e2e

VERSION ?= $(shell tr -d '\r\n' < ./cmd/server/VERSION)
LDFLAGS ?= -s -w -X main.Version=$(VERSION)
DEV_DATA_DIR ?= ./.dev-data
DEV_SERVER_PORT ?= 18080
DEV_LOG_LEVEL ?= debug
DEV_LOG_FORMAT ?= console

build:
	CGO_ENABLED=0 go build -ldflags="$(LDFLAGS)" -trimpath -o bin/server ./cmd/server

dev:
	DATA_DIR=$(DEV_DATA_DIR) SERVER_MODE=debug SERVER_PORT=$(DEV_SERVER_PORT) LOG_LEVEL=$(DEV_LOG_LEVEL) LOG_FORMAT=$(DEV_LOG_FORMAT) LOG_OUTPUT_TO_STDOUT=true LOG_OUTPUT_TO_FILE=true go run ./cmd/server

generate:
	go generate ./ent
	go generate ./cmd/server

test:
	go test ./...
	golangci-lint run ./...

test-unit:
	go test -tags=unit ./...

test-integration:
	go test -tags=integration ./...

test-e2e:
	./scripts/e2e-test.sh

test-e2e-local:
	go test -tags=e2e -v -timeout=300s ./internal/integration/...
