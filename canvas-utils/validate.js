const { ContentError } = require('./errors')
const { isTypeOf } = require('./validators')

const validate = {
  typeOf(type, target) {
    if (!isTypeOf(target, type)) throw new TypeError(`${target} is not a ${type}`)
  },
  string(target) {
    this.typeOf('string', target)
  },
  number(target) {
    this.typeOf('number', target)
  }
}

validate.string.notVoid = function(name, target) {
  if(!target.trim().length) throw new ContentError(`${name} is empty or blank`)
}

module.exports = validate
