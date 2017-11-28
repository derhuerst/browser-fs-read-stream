'use strict'

const fs = require('fs')

fs.createReadStream('foo.txt', {encoding: 'utf8'})
.on('data', console.log)
