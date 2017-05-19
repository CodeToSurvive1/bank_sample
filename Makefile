git_version = $$(git branch 2>/dev/null | sed -e '/^[^*]/d'-e's/* \(.*\)/\1/')
npm_bin= $$(npm bin)

all: test
install:
	@npm install
test:
	@echo ""
	@echo "make test-ios-safari      Test sample for iOS Safari"
	@echo "make test-android-chrome  Test sample for Android Chrome"
test-pc:
	macaca doctor
	macaca run --verbose
travis-pc:
	npm install macaca-electron --save-dev
	${npm_bin}/macaca doctor
	${npm_bin}/macaca run --no-window
custom-reporter:
	macaca doctor
	CUSTOM_DIR=macaca-logs/macaca-desktop-sample macaca run --verbose --reporter macaca-simple-reportor
jshint:
	@${npm_bin}/jshint .
.PHONY: test
