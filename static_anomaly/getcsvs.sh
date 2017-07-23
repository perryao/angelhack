#!/bin/bash

root="../dat/Making/2017/"
ext=".csv"
for f in $(find ../dat/Making/2017 -name '*.xlsx'); do
	base=$(basename $f)
	filename="${base%.*}"

	echo $root$filename$ext
	xlsx2csv $f > $root$filename$ext

done