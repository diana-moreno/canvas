require('dotenv').config()
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const { database, models: { Note } } = require('canvas-data')
const { errors: { ContentError } } = require('canvas-utils')
const { random, floor } = Math
const createNote = require('.')

describe('logic - create note', () => {
  before(() => database.connect(DB_URL_TEST))

  let indexBox, description

  beforeEach(async () => {
    await Promise.all([Note.deleteMany()])

    indexBox = floor(random() * 9)
    description = `description-${random()}`
  })

  it('should succeed on create a note', async () => {

    const noteId = await createNote(indexBox, description)

    expect(noteId).to.exist
    expect(noteId).to.be.a('string')
    expect(noteId).to.have.length.greaterThan(0)

    const note = await Note.findById(noteId)

    expect(note).to.exist
    expect(note.id.toString()).to.equal(noteId)
    expect(note.description).to.equal(description)
    expect(note.indexBox).to.equal(indexBox)
  })

  it('should fail on incorrect indexBox or description content or type', () => {
    expect(() => createNote('hello')).to.throw(TypeError, 'hello is not a number')
    expect(() => createNote(true)).to.throw(TypeError, 'true is not a number')
    expect(() => createNote([])).to.throw(TypeError, ' is not a number')
    expect(() => createNote({})).to.throw(TypeError, '[object Object] is not a number')
    expect(() => createNote()).to.throw(TypeError, 'undefined is not a number')
    expect(() => createNote(null)).to.throw(TypeError, 'null is not a number')

    expect(() => createNote(indexBox, 1)).to.throw(TypeError, '1 is not a string')
    expect(() => createNote(indexBox, true)).to.throw(TypeError, 'true is not a string')
    expect(() => createNote(indexBox, [])).to.throw(TypeError, ' is not a string')
    expect(() => createNote(indexBox, {})).to.throw(TypeError, '[object Object] is not a string')
    expect(() => createNote(indexBox, ' \t\r')).to.throw(ContentError, 'description is empty or blank')
  })

  after(() => Promise.all([ Note.deleteMany()]).then(database.disconnect))
})
