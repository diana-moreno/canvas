require('dotenv').config()
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const { database, models: { Note } } = require('canvas-data')
const { random, floor } = Math
const listNotes = require('.')

describe('logic - list notes', () => {
  before(() => database.connect(DB_URL_TEST))

  let ids, indexBoxes, descriptions, insertions

  beforeEach(async () => {
    await Promise.all([Note.deleteMany()])

    ids = []
    indexBoxes = []
    descriptions = []
    insertions = []

    for (let i = 0; i < 10; i++) {
      const note = {
        indexBox: floor(random() * 9),
        description: `description-${random()}`
      }

      let currentNote = await Note.create(note)
      insertions.push(currentNote)
      indexBoxes.push(currentNote.indexBox)
      descriptions.push(currentNote.description)
      ids.push(currentNote.id.toString())
    }
    await Promise.all(insertions)
  })

  it('should succeed on listing notes', async () => {

    const notes = await listNotes()

    expect(notes).to.exist
    expect(notes).to.have.lengthOf(insertions.length) // 10 in loop

    notes.forEach(note => {
      expect(note.id).to.exist
      expect(note.id).to.be.a('string')
      expect(note.id).to.have.length.greaterThan(0)
      expect(note.id).be.oneOf(ids)
      expect(note.indexBox).to.exist
      expect(note.indexBox).to.be.a('number')
      expect(note.indexBox).be.oneOf(indexBoxes)
      expect(note.description).to.exist
      expect(note.description).to.be.a('string')
      expect(note.description).to.have.length.greaterThan(0)
      expect(note.description).be.oneOf(descriptions)
    })
  })

  describe('logic - when there are no notes to list', () => {
    beforeEach(async () => {
      await Promise.all([Note.deleteMany()])
    })

    it('should succeed on empty listing notes', async () => {
      const notes = await listNotes()

      expect(notes).to.exist
      expect(notes).to.have.lengthOf(0)
    })
  })

  after(() => Promise.all([ Note.deleteMany()]).then(database.disconnect))
})
