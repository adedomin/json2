json2
=====

simple utility for transforming json documents into grep-able and sed-able lines

install
-------

    # json2 was already taken
    npm install -g 2json

usage
-----

    # json2 args
    json2 [file] [< or_file]

    # 2json
    2json [file] [< or_file]

    # get package name
    basename $(json2 package.json | grep '/name')

    # change package name and reconvert lines to json using 2json
    json2 < package.json | sed 's@\(/name\)/.*@\1/new-name@' | 2json -p

notes
------

/ [ ] are reserved by the json line grammar, if such values are found in your json, they will be quoted in double quotes.

