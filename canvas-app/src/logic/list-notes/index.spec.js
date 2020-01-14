const { env: { REACT_APP_TEST_DB_URL: TEST_DB_URL } } = process
const { database, models: { Note } } = require('canvas-data')
const { random, floor } = Math
require('../../helpers/jest-matchers')
import listNotes from '.'

describe('logic - list notes', () => {
  beforeAll(() => database.connect(TEST_DB_URL))

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
      ids.push(currentNote._id.toString())
    }
    await Promise.all(insertions)
  })

  it('should succeed on listing notes', async () => {
    const notes = await listNotes()

    expect(notes).toBeDefined()
    expect(notes).toHaveLength(insertions.length) // 10 in loop

    notes.forEach(note => {
      expect(note._id).toBeDefined()
      expect(note._id).toBeOfType('string')
      expect(note._id).toHaveLengthGreaterThan(0)
      expect(note._id).toBeOneOf(ids)
      expect(note.indexBox).toBeDefined()
      expect(note.indexBox).toBeOfType('number')
      expect(note.indexBox).toBeOneOf(indexBoxes)
      expect(note.description).toBeDefined()
      expect(note.description).toBeOfType('string')
      expect(note.description).toHaveLengthGreaterThan(0)
      expect(note.description).toBeOneOf(descriptions)
    })
  })

  describe('logic - when there are no notes to list', () => {
    beforeEach(async () => {
      await Promise.all([Note.deleteMany()])
    })

    it('should succeed on empty listing notes', async () => {
      const notes = await listNotes()

      expect(notes).toBeDefined()
      expect(notes).toHaveLength(0)
    })
  })

  it('should fail on error conexion', async () => {
    try {
      await listNotes()

    } catch (error) {
      expect(error).toBeDefined()
      expect(error).toBeInstanceOf(NotFoundError)
      expect(error.message).toBe(`Not found. It is not possible to list notes.`)
    }
  })


  afterAll(() => Promise.all([Note.deleteMany()]).then(database.disconnect))
})
