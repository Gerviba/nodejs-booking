all: start

install:
	npm install

start:
	npm start

startmongo:
	docker run --name mongo-testing -p 27017:27017 --rm mongo:latest