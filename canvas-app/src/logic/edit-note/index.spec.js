const { env: { REACT_APP_TEST_DB_URL: TEST_DB_URL } } = process
const { database, models: { Note } } = require('canvas-data')
const { errors: { ContentError, NotFoundError } } = require('canvas-utils')
const { random, floor } = Math
require('../../helpers/jest-matchers')
import editNote from '.'

describe('logic - edit note', () => {
  beforeAll(() => database.connect(TEST_DB_URL))

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

    expect(note).toBeDefined()
    expect(note.id.toString()).toBe(id)
    expect(note.description).toBe(description)
    expect(note.indexBox).toBe(indexBox)

    await editNote(id, newDescription)
    note = await Note.findById(id)

    expect(note).toBeDefined()
    expect(note.id.toString()).toBe(id)
    expect(note.description).toBe(newDescription)
/*    expect(note.description).notToBe(description)*/
    expect(note.indexBox).toBe(indexBox)
  })

  it('should fail on wrong note id', async () => {
    id = '012345678901234567890123'
    try {
      await editNote(id, newDescription)

    } catch (error) {
      expect(error).toBeDefined()
      expect(error).toBeInstanceOf(NotFoundError)
      expect(error.message).toBe(`Not found. It is not possible to edit a note.`)
    }
  })

  it('should fail on incorrect id or newDescription content or type', () => {
    expect(() => editNote(1)).toThrow(TypeError, '1 is not a string')
    expect(() => editNote(true)).toThrow(TypeError, 'true is not a string')
    expect(() => editNote([])).toThrow(TypeError, ' is not a string')
    expect(() => editNote({})).toThrow(TypeError, '[object Object] is not a string')
    expect(() => editNote()).toThrow(TypeError, 'undefined is not a string')
    expect(() => editNote(null)).toThrow(TypeError, 'null is not a string')
    expect(() => editNote(' \t\r')).toThrow(ContentError, 'id is empty or blank')

    expect(() => editNote(id, 1)).toThrow(TypeError, '1 is not a string')
    expect(() => editNote(id, true)).toThrow(TypeError, 'true is not a string')
    expect(() => editNote(id, [])).toThrow(TypeError, ' is not a string')
    expect(() => editNote(id, {})).toThrow(TypeError, '[object Object] is not a string')
    expect(() => editNote(id, ' \t\r')).toThrow(ContentError, 'newDescription is empty or blank')
  })

  afterAll(() => Promise.all([ Note.deleteMany()]).then(database.disconnect))
})
