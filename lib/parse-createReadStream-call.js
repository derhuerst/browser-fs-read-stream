'use strict'

const isStringLiteral = n => n.type === 'Literal' && 'string' === typeof n.value

const createParser = (nameOfFs) => {
	const parseCreateReadStreamCall = (n) => {
		if (
			n.type !== 'CallExpression' ||
			n.arguments.length === 0 ||
			n.arguments.length > 2
		) return null

		const c = n.callee
		if (
			c.type !== 'MemberExpression' ||
			!c.object || c.object.type !== 'Identifier' ||
			c.object.name !== nameOfFs ||
			!c.property || c.property.type !== 'Identifier' ||
			c.property.name !== 'createReadStream'
		) return null

		const arg1 = n.arguments[0]
		const arg2 = n.arguments[1]
		const res = {path: arg1.raw, opt: 'null'}

		if (!isStringLiteral(arg1)) return null
		if (isStringLiteral(arg2)) res.opt = arg2.raw
		else if (arg2.type === 'ObjectExpression') res.opt = arg2.source()
		else return null

		return res
	}
	return parseCreateReadStreamCall
}

module.exports = createParser
