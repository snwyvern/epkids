#!/bin/sh
sass theme.scss >theme.css
css2html theme.css >theme.html
html-beautify -r theme.html
