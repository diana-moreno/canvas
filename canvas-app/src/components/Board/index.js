import React, {useState, useEffect} from 'react'
import './index.sass'
import Header from '../Header'
import BoardSection from '../BoardSection'
import constants from './constants.js'
import logic from '../../logic'
const { boxes, boardSections } = constants
const { listNotes, createNote, editNote, deleteNote } = logic

export default function () {
  const [notes, setNotes] = useState()
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    (async () => {
      const notes = await listNotes()
      setNotes(notes)
      setUpdate(false)
    })()
  }, [update])

  async function handleCreateNote(indexBox, description) {
    try {
      const { note } = await createNote(indexBox, description)
      setUpdate(true)
    } catch({ message }) {
      console.log(message)
    }
  }

  async function handleEditNote(id, description) {
    try {
      await editNote(id, description)
      setUpdate(true)
    } catch({ message }) {
      console.log(message)
    }
  }

  async function handleDeleteNote(id) {
    try {
      await deleteNote(id)
      setUpdate(true)
    } catch({ message }) {
      console.log(message)
    }
  }

  return <>
    <Header />
    <main className='board'>
      { boardSections.map(section => {
        const { position, startIndex, endIndex } = section
          return <BoardSection
            boxes={boxes.slice(startIndex, endIndex)}
            className={`board__${position}`}
            notes={notes}
            onCreateNewNote={handleCreateNote}
            onEditNote={handleEditNote}
            onDeleteNote={handleDeleteNote}
            key={position}
          />
        })
      }
    </main>
  </>
}
