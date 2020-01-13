const { Router } = require('express')
const { createNote, deleteNote, editNote } = require('../../logic')
const bodyParser = require('body-parser')
const { errors: { NotFoundError } } = require('canvas-utils')

const jsonBodyParser = bodyParser.json()
const router = Router()

router.post('/', jsonBodyParser, (req, res) => {
  try {
  const { body: { indexBox, description } } = req
    createNote(indexBox, description)
      .then((note) => res.json({ note }))
      .catch(error => {
        const { message } = error

        res.status(500).json({ message })
      })
  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

router.delete('/:id', jsonBodyParser, (req, res) => {
  try {
  const { params: { id } } = req
    deleteNote(id)
      .then(() => res.status(201).end())
      .catch(error => {
        const { message } = error

        if (error instanceof NotFoundError)
          return res.status(404).json({ message })

        res.status(500).json({ message })
      })
  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

router.patch('/:id', jsonBodyParser, (req, res) => {
  try {
  const { params: { id }, body: { newDescription } } = req
    editNote(id, newDescription)
      .then(() => res.status(201).end())
      .catch(error => {
        const { message } = error

        if (error instanceof NotFoundError)
          return res.status(404).json({ message })

        res.status(500).json({ message })
      })
  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

module.exports = router