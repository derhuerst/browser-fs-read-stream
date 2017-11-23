'use strict'

const path = require('path')
const fs = require('fs')

const src = path.join(__dirname, 'foo.txt')

fs.createReadStream(src, {encoding: 'utf8'})
.on('data', console.log)
