require('dotenv').config()
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const { database, models: { Note } } = require('canvas-data')
const { errors: { ContentError, NotFoundError } } = require('canvas-utils')
const { random, floor } = Math
const deleteNote = require('.')

describe('logic - delete note', () => {
  before(() => database.connect(DB_URL_TEST))

  let id, indexBox, description

  beforeEach(async () => {
    await Promise.all([Note.deleteMany()])

    indexBox = floor(random() * 9)
    description = `description-${random()}`

    const note = await Note.create({ indexBox, description })
    id = note.id
  })

  it('should succeed on delete a note', async () => {
    let note = await Note.findById(id)

    expect(note).to.exist
    expect(note.id.toString()).to.equal(id)
    expect(note.description).to.equal(description)
    expect(note.indexBox).to.equal(indexBox)

    await deleteNote(id)
    note = await Note.findById(id)

    expect(note).not.to.exist
  })

  it('should fail on wrong user id', async () => {
    id = '012345678901234567890123'
    try {
      await deleteNote(id)

    } catch (error) {
      expect(error).to.exist
      expect(error).to.be.an.instanceOf(NotFoundError)
      expect(error.message).to.equal(`note with id ${id} not found`)
    }
  })

  it('should fail on incorrect id content or type', () => {
    expect(() => deleteNote(1)).to.throw(TypeError, '1 is not a string')
    expect(() => deleteNote(true)).to.throw(TypeError, 'true is not a string')
    expect(() => deleteNote([])).to.throw(TypeError, ' is not a string')
    expect(() => deleteNote({})).to.throw(TypeError, '[object Object] is not a string')
    expect(() => deleteNote()).to.throw(TypeError, 'undefined is not a string')
    expect(() => deleteNote(null)).to.throw(TypeError, 'null is not a string')
    expect(() => deleteNote(' \t\r')).to.throw(ContentError, 'id is empty or blank')
    expect(() => deleteNote('123456')).to.throw(ContentError, '123456 is not a valid id')
  })

  after(() => Promise.all([ Note.deleteMany()]).then(database.disconnect))
})
