const { validate, errors: { NotFoundError, ContentError } } = require('canvas-utils')
const { ObjectId, models: { Note } } = require('canvas-data')

module.exports = function(id, newDescription) {
  validate.string(id)
  validate.string.notVoid('id', id)
  if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)
// 400
  validate.string(newDescription)
  validate.string.notVoid('newDescription', newDescription)

  return (async () => {
    const note = await Note.findById(id)

    if (!note) throw new NotFoundError(`note with id ${id} not found`)

    await Note.updateOne({ _id: ObjectId(id) }, { description: newDescription })
  })()
}
