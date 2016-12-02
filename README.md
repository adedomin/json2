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
    # -p flag pretty prints json
    2json [file] [< or_file] [-p --pretty]

    # get package name
    basename $(json2 package.json | grep '/name')

    # change package name and reconvert lines to json using 2json
    json2 < package.json | sed 's@\(/name\)/.*@\1/new-name@' | 2json -p

escapes for json2/2json
-----------------------

The following are escaped--by being in quote strings, as per rules:
 
  * all forward slashes (/)
  * all index brackets ([ or ])
  * all strings that are just number characters (e.g. 00193425)

You must escape double quotes in strings, json2 does this.

backslash escapes for 2json
---------------------------

The following characters must be escaped to handle issues with newlines using backslashes, whether in quotes or not:

    \ <- escape as \\
    \n
    \r
    \f

notes
------

/ [ ] are reserved by the json line grammar, if such values are found in your json, they will be quoted in double quotes.

