SHELL:=/bin/bash

help:
	@echo "start-apollo-client-dev - Starts single-page application and Apollo Server."
	@echo "start-apollo-client-build - Builds single-page application onto host machine."
	@echo "start-apollo-server-prod - Starts Apollo Server for production use."
	@echo "start-apollo-server-dev - Starts Apollo Server for local development."
	@echo "start-apollo-server-types-check - Type check the source files for the server application."

start-apollo-client-dev:
	docker-compose up apollo-client-dev

start-apollo-client-build:
	mkdir -p ./client/build && docker-compose run --rm apollo-client-builder

start-apollo-server-prod:
	docker-compose up apollo-server-prod

start-apollo-server-dev:
	docker-compose run --rm --service-ports apollo-server-dev

start-apollo-server-types-check:
	docker-compose run --rm --service-ports apollo-server-dev npm run types:check

start-apollo-server-test:
	docker-compose run --rm --service-ports apollo-server-dev npm run test