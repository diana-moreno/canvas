const { validate, errors: { NotFoundError } } = require('canvas-utils')
const { models: { Note } } = require('canvas-data')

module.exports = function(index, description, group) {
  validate.string(status)
  validate.string.notVoid('status', status)

  validate.string(title)
  validate.string.notVoid('title', title)

  return (async () => {
    const createdNote = await Task.create({ index, description, group })

    return task
  })()
}
