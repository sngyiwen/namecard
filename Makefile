.PHONY: install start ios android web test clean

install:
	npm install

start: install
	npm run start

ios: install
	npm run ios

android: install
	npm run android

web: install
	npm run web

test:
	npm test

clean:
	rm -rf node_modules
