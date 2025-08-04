.RECIPEPREFIX := :

build:
:	go build -o ./bin/nala ./cmd/cli

install: build
:	sudo install -Dm755 ./bin/nala /usr/local/bin/nala

