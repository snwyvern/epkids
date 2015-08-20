#!/bin/sh
sass app.scss >app.css
css-beautify -r app.css
