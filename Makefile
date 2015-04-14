DOCSET_DIR = io.js.docset/Contents/Resources/Documents
FONTS_CSS = $(DOCSET_DIR)/fonts.googleapis.com/css*
IOJS_DIR = $(DOCSET_DIR)/iojs.org
API_DIR = $(IOJS_DIR)/api

all: fonts clean copy docset pack

clean:
	@rm -rf $(API_DIR)/*

copy:
	@cd ..; make doc
	@cp -R ../io.js/out/doc/api/* $(API_DIR)/

fonts:
	@if [ ! -f $(FONTS_CSS) ]; then \
		iojs fonts; \
	fi

docset:
	@iojs dash `find "$(API_DIR)"/*.json`

pack:
	@tar --exclude='.DS_Store' -cvzf io.js.tgz io.js.docset

.PHONY: fonts copy docset pack
