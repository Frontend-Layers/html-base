# Description: Makefile for starting and stopping the docker container

# Open browser
ifeq ($(OS),Windows_NT)
	OPEN_CMD = powershell -Command "Start-Process 'http://localhost:4000'"
	SLEEP_CMD = timeout /t 1 /nobreak > NUL
else
	UNAME_S := $(shell uname -s)
	ifeq ($(UNAME_S),Linux)
		OPEN_CMD = xdg-open
		SLEEP_CMD = sleep 1
	endif
	ifeq ($(UNAME_S),Darwin)
		OPEN_CMD = open
		SLEEP_CMD = sleep 1
	endif
endif

# Commands to start the docker container
up:
	@docker-compose up -d || { echo "Failed to start containers"; exit 1; }
	@$(SLEEP_CMD)
	@$(OPEN_CMD) || { echo "Failed to open browser"; }
	@docker logs -f html-base

# Commands to see the logs of the docker container
log:
	@docker logs -f html-base

# Commands to stop the docker container
down:
	@docker-compose down

clean:
	@docker-compose down --volumes --remove-orphans
	@docker system prune -f

# Commands to enter the docker container's shell
exec:
	@docker exec -it html-base /bin/bash@docker exec -it html-base /bin/bash
