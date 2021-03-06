# browser-fs-read-stream

**Deprecated.** I decided not to statically transform the code, but to make [`fs-read-stream-over-http`](https://github.com/derhuerst/fs-read-stream-over-http#fs-read-stream-over-http) isomorphic.

[![npm version](https://img.shields.io/npm/v/browser-fs-read-stream.svg)](https://www.npmjs.com/package/browser-fs-read-stream)
[![build status](https://api.travis-ci.org/derhuerst/browser-fs-read-stream.svg?branch=master)](https://travis-ci.org/derhuerst/browser-fs-read-stream)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/browser-fs-read-stream.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)

**[Browserify](http://browserify.org/) transform to replace [fs.createReadStream](https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options) by [`fs-read-stream-over-http`](https://github.com/derhuerst/fs-read-stream-over-http), which uses HTTP `GET` requests.**


## Installing

```shell
npm install --save-dev browser-fs-read-stream
```


## Usage

```js
// index.js

const fs = require('fs')

fs.createReadStream('foo.txt', {encoding: 'utf8'})
.on('data', console.log)
```

```shell
browserify -t browser-fs-read-stream index.js >bundle.js
```

```js
// bundle.js

// …
const fs = require('fs')

fsReadStreamOverHttp('foo.txt', {encoding: 'utf8'})
.on('data', console.log)
// …
```


## Contributing

If you have a question or have difficulties using `browser-fs-read-stream`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/browser-fs-read-stream/issues).
