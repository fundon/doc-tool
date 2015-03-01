# io.js docset generator for Dash, Zeal

## Generate io.js docset

```sh
$ git clone git@github.com:iojs/io.js.git
$ git clone git@github.com:fundon/iojs-docset.git


# change to io.js project
$ cd io.js
$ ln -sf ../iojs-docset dash

$ cp dash/template.html doc/template.html

# generate io.js API docs
$ make doc

$ rm -rf dash/io.js.docset/Contents/Resources/Documents/iojs.org/api/*
$ cp -R out/doc/api/* dash/io.js.docset/Contents/Resources/Documents/iojs.org/api/
# generate io.js docset
$ cd dash
$ make
```

## MIT
