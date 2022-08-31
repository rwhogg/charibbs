.PHONY: clean deploy deploy-ae deploy-fb lint

build: public/* src/* lint
	npm run build

deploy: deploy-ae deploy-fb

deploy-ae: build
	gcloud app deploy

deploy-fb: functions
	firebase deploy --only functions

clean:
	rm -rf build node_modules

node_modules: package.json package-lock.json
	npm i

lint: src package.json
	./node_modules/.bin/eslint --fix src/*.js
