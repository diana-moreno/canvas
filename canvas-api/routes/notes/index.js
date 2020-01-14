const { Router } = require('express')
const { createNote, deleteNote, editNote, listNotes } = require('../../logic')
const bodyParser = require('body-parser')
const { errors: { NotFoundError, ContentError } } = require('canvas-utils')

const jsonBodyParser = bodyParser.json()
const router = Router()

router.post('/', jsonBodyParser, (req, res) => {
  try {
    const { body: { indexBox, description } } = req
    const note = createNote(Number(indexBox), description)
    res.json(note)

  } catch (error) {
    const { message } = error
    if(error instanceof ContentError) {
      res.status(400).json(message)
    } else {
      res.status(500).json(message)
    }
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { params: { id } } = req
    await deleteNote(id)
    res.status(201).end()

  } catch (error) {
    const { message } = error
    if (error instanceof NotFoundError) {
      res.status(404).json(message)
    } else if(error instanceof ContentError) {
      res.status(400).json(message)
    } else {
      res.status(500).json(message)
    }
  }
})

router.patch('/:id', jsonBodyParser, async (req, res) => {
  try {
    const { params: { id }, body: { newDescription } } = req
    await editNote(id, newDescription)
    res.status(201).end()

  } catch (error) {
    const { message } = error
    if (error instanceof NotFoundError) {
      res.status(404).json(message)
    } else if(error instanceof ContentError) {
      res.status(400).json(message)
    } else {
      res.status(500).json(message)
    }
  }
})

router.get('/', async (req, res) => {
  try {
    const notes = await listNotes()
    res.json(notes)

  } catch (error) {
    res.status(500).json(message)
  }
})

module.exports = router