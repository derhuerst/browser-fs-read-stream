'use strict'

const path = require('path')
const through = require('through2')
const {StringDecoder} = require('string_decoder')
const acorn = require('acorn')
const astw = require('astw')
const falafel = require('falafel')

const createReadStreamParser = require('./lib/parse-createReadStream-call')

const transform = (file, opt) => {
	if (path.extname(file) === '.json') return through()

	const decoder = new StringDecoder('utf8')
	let src = ''
	const write = (chunk, _, cb) => {
		src += decoder.write(chunk)
		cb()
	}
	const flush = function () {
		src += decoder.end()

		if (
			src.indexOf('require') < 0 ||
			src.indexOf('fs') < 0 ||
			src.indexOf('createReadStream') < 0
		) {
			this.push(src)
			return this.emit('end')
		}

		let nameOfFs
		const findModuleVarName = (n) => {
			if (
				!nameOfFs &&
				n.type === 'CallExpression' &&
				n.callee && n.callee.name === 'require' &&
				n.arguments.length === 1 &&
				n.arguments[0].value === 'fs'
			) nameOfFs = n.parent.id.name
		}

		const ast = acorn.parse(src)
		astw(ast)(findModuleVarName)
		if (!nameOfFs) {
			this.push(src)
			return this.emit('end')
		}

		const parseCall = createReadStreamParser(nameOfFs)
		const replaceCalls = (n) => {
			const res = parseCall(n)
			if (res) {
				// todo: transform path using passed fn
				n.update(`foo(${res.path}, ${res.opt})`)
			}
		}

		// todo: avoid parsing src twice
		const newSrc = '' + falafel(src, replaceCalls)
		this.push(newSrc)
		this.emit('end')
	}

	return through(write, flush)
}

module.exports = transform
