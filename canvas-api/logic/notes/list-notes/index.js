const { validate } = require('canvas-utils')
const { models: { Note } } = require('canvas-data')

module.exports = function() {

  return (async () => {
    const notes = await Note.find()
    return notes
  })()
}
