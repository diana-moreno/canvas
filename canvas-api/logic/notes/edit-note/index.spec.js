require('dotenv').config()
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const { database, models: { Note } } = require('canvas-data')
const { errors: { ContentError, NotFoundError } } = require('canvas-utils')
const { random, floor } = Math
const editNote = require('.')

describe('logic - edit note', () => {
  before(() => database.connect(DB_URL_TEST))

  let id, newDescription, indexBox, description

  beforeEach(async () => {
    await Promise.all([Note.deleteMany()])

    indexBox = floor(random() * 9)
    description = `description-${random()}`
    newDescription = `newDescription-${random()}`

    const note = await Note.create({ indexBox, description })
    id = note.id
  })

  it('should succeed on edit a note', async () => {
    let note = await Note.findById(id)
    let description = note.description

    expect(note).to.exist
    expect(note.id.toString()).to.equal(id)
    expect(note.description).to.equal(description)
    expect(note.indexBox).to.equal(indexBox)

    await editNote(id, newDescription)
    note = await Note.findById(id)

    expect(note).to.exist
    expect(note.id.toString()).to.equal(id)
    expect(note.description).to.equal(newDescription)
    expect(note.description).not.to.equal(description)
    expect(note.indexBox).to.equal(indexBox)
  })

  it('should fail on wrong user id', async () => {
    id = '012345678901234567890123'
    try {
      await editNote(id, newDescription)

    } catch (error) {
      expect(error).to.exist
      expect(error).to.be.an.instanceOf(NotFoundError)
      expect(error.message).to.equal(`note with id ${id} not found`)
    }
  })

  it('should fail on incorrect id or newDescription content or type', () => {
    expect(() => editNote(1)).to.throw(TypeError, '1 is not a string')
    expect(() => editNote(true)).to.throw(TypeError, 'true is not a string')
    expect(() => editNote([])).to.throw(TypeError, ' is not a string')
    expect(() => editNote({})).to.throw(TypeError, '[object Object] is not a string')
    expect(() => editNote()).to.throw(TypeError, 'undefined is not a string')
    expect(() => editNote(null)).to.throw(TypeError, 'null is not a string')
    expect(() => editNote(' \t\r')).to.throw(ContentError, 'id is empty or blank')
    expect(() => editNote('123456')).to.throw(ContentError, '123456 is not a valid id')

    expect(() => editNote(id, 1)).to.throw(TypeError, '1 is not a string')
    expect(() => editNote(id, true)).to.throw(TypeError, 'true is not a string')
    expect(() => editNote(id, [])).to.throw(TypeError, ' is not a string')
    expect(() => editNote(id, {})).to.throw(TypeError, '[object Object] is not a string')
    expect(() => editNote(id, ' \t\r')).to.throw(ContentError, 'newDescription is empty or blank')
  })

  after(() => Promise.all([ Note.deleteMany()]).then(database.disconnect))
})
