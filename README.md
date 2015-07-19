
Online demo at http://syssgx.github.com/xml.js/

This package exports the `xmllint` object which is an Emscripten port of
libxml2's `xmllint` command for use in the browser or node.

##### API #####

```javascript

xmllint(args, files);

```

`args` is an array of arguments to pass to xmllint.

`files` is an array of objects, each with a `path` and `data` property. These will be turned into pseudo-filesystem objects for xmllint to access.

The return value Object has two properties: 'stdout' and 'stderr':

```javascript

if (!xmllint(args, files).stderr) {
	//there were no errors.
}

```

#### Building xmllint from source ####

[Install the Emscripten SDK](https://kripken.github.io/emscripten-site/docs/getting_started/downloads.html).

```
	git clone
	git submodule init
	git submodule update

	npm install

	source ../emscripten_portable/emsdk_env.sh

	gulp clean
	gulp libxml2
	gulp compile
	gulp test
```
