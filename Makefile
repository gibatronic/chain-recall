.DEFAULT_GOAL:=help

.PHONY: all \
				build \
				help \
				install \
				scripts \
				styles \
				templates \
				tests \
				watch

.SILENT:

# generate assets
build: images scripts styles templates

# show some help
help:
	tasks/help

# install dependencies
install:
	tasks/install

# generate scripts
scripts:
	tasks/scripts

# generate styles
styles:
	tasks/styles

# generate templates
templates:
	tasks/templates

# run some tests
tests:
	tasks

# build whenever something changes
watch: build
	tasks/watch
