const { env: { REACT_APP_TEST_DB_URL: TEST_DB_URL } } = process
const { database, models: { Note } } = require('canvas-data')
const { errors: { ContentError, NotFoundError } } = require('canvas-utils')
const { random, floor } = Math
require('../../helpers/jest-matchers')
import createNote from '.'

describe('logic - create note', () => {
  beforeAll(() => database.connect(TEST_DB_URL))

  let indexBox, description

  beforeEach(async () => {
    await Promise.all([Note.deleteMany()])

    indexBox = floor(random() * 9)
    description = `description-${random()}`
  })

  it('should succeed on create a note', async () => {
    const noteId = await createNote(indexBox, description)

    expect(noteId).toBeDefined()
    expect(noteId).toBeOfType('string')
    expect(noteId).toHaveLengthGreaterThan(0)

    const note = await Note.findById(noteId)

    expect(note).toBeDefined()
    expect(note._id.toString()).toBe(noteId)
    expect(note.description).toBe(description)
    expect(note.indexBox).toBe(indexBox)
  })

    it('should fail on error conexion', async () => {
    try {
      await createNote(indexBox, description)

    } catch (error) {
      expect(error).toBeDefined()
      expect(error).toBeInstanceOf(NotFoundError)
      expect(error.message).toBe(`Not found. It is not possible to create a note.`)
    }
  })

  it('should fail on incorrect indexBox or description content or type', () => {
    expect(() => createNote('hello')).toThrow(TypeError, 'hello is not a number')
    expect(() => createNote(true)).toThrow(TypeError, 'true is not a number')
    expect(() => createNote([])).toThrow(TypeError, ' is not a number')
    expect(() => createNote({})).toThrow(TypeError, '[object Object] is not a number')
    expect(() => createNote()).toThrow(TypeError, 'undefined is not a number')
    expect(() => createNote(null)).toThrow(TypeError, 'null is not a number')

    expect(() => createNote(indexBox, 1)).toThrow(TypeError, '1 is not a string')
    expect(() => createNote(indexBox, true)).toThrow(TypeError, 'true is not a string')
    expect(() => createNote(indexBox, [])).toThrow(TypeError, ' is not a string')
    expect(() => createNote(indexBox, {})).toThrow(TypeError, '[object Object] is not a string')
    expect(() => createNote(indexBox, ' \t\r')).toThrow(ContentError, 'description is empty or blank')
  })

  afterAll(() => Promise.all([Note.deleteMany()]).then(database.disconnect))
})
