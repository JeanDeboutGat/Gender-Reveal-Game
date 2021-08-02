
dev: export NODE_ENV = development

dev: build

build:	npm-i npm-r

npm-i:
	npm i

npm-r:
	npm run dev
