const { Router } = require('express')
const { createNote, deleteNote, editNote, listNotes } = require('../../logic')
const bodyParser = require('body-parser')
const { errors: { NotFoundError, ContentError } } = require('canvas-utils')

const jsonBodyParser = bodyParser.json()
const router = Router()

router.post('/', jsonBodyParser, async (req, res) => {
  const { body: { indexBox, description } } = req
  try {
    const note = await createNote(Number(indexBox), description)
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
  const { params: { id } } = req
  try {
    await deleteNote(id)
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
  res.status(201).end()
})

router.patch('/:id', jsonBodyParser, async (req, res) => {
  const { params: { id }, body: { newDescription } } = req
  try {
    await editNote(id, newDescription)
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
  res.status(201).end()
})

router.get('/', async (req, res) => {
  try {
    const notes = await listNotes()
    res.json(notes)
  } catch (error) {
    const { message } = error
    res.status(500).json(message)
  }
})

module.exports = router