const { env: { REACT_APP_TEST_DB_URL: TEST_DB_URL } } = process
const { database, models: { Note } } = require('canvas-data')
const { errors: { ContentError, NotFoundError } } = require('canvas-utils')
const { random, floor } = Math
require('../../helpers/jest-matchers')
import deleteNote from '.'

describe('logic - delete note', () => {
  beforeAll(() => database.connect(TEST_DB_URL))

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

    expect(note).toBeDefined()
    expect(note.id.toString()).toBe(id)
    expect(note.description).toBe(description)
    expect(note.indexBox).toBe(indexBox)

    await deleteNote(id)
    note = await Note.findById(id)

/*    expect(note).not.toBeDefined()*/
  })

  it('should fail on wrong user id', async () => {
    id = '012345678901234567890123'
    try {
      await deleteNote(id)

    } catch (error) {
      expect(error).toBeDefined()
      expect(error).toBeInstanceOf(NotFoundError)
      expect(error.message).toBe(`Not found. It is not possible to delete a note.`)
    }
  })

  it('should fail on incorrect id content or type', () => {
    expect(() => deleteNote(1)).toThrow(TypeError, '1 is not a string')
    expect(() => deleteNote(true)).toThrow(TypeError, 'true is not a string')
    expect(() => deleteNote([])).toThrow(TypeError, ' is not a string')
    expect(() => deleteNote({})).toThrow(TypeError, '[object Object] is not a string')
    expect(() => deleteNote()).toThrow(TypeError, 'undefined is not a string')
    expect(() => deleteNote(null)).toThrow(TypeError, 'null is not a string')
    expect(() => deleteNote(' \t\r')).toThrow(ContentError, 'id is empty or blank')
  })

  afterAll(() => Promise.all([ Note.deleteMany()]).then(database.disconnect))
})
