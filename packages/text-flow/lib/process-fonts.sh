#! /usr/bin/env bash

pip install bs4 lxml
fontforge -script ./lib/font_export/convert.pe ../../dist/public/fonts/*.ttf
python ./lib/font_export/main.py
