const { validate } = require('canvas-utils')
const { models: { Note } } = require('canvas-data')

module.exports = function(indexBox, description) {
  validate.number(indexBox)

  validate.string(description)
  validate.string.notVoid('description', description)

  return (async () => {
    const note = await Note.create({ indexBox, description })

    return note.id
  })()
}
