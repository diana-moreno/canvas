import React, {useState, useEffect} from 'react'
import './index.sass'
import Header from '../Header'
import BoardSection from '../BoardSection'
import boxes from './constants.js'
import logic from '../../logic'
const { listNotes, createNote } = logic

export default function () {
  const [notes, setNotes] = useState()
  const [newNote, setNewNote] = useState()

  useEffect(() => {
    (async () => {
      const notes = await listNotes()
      setNotes(notes)
    })()
  }, [newNote])

  async function handleCreateNote(indexBox, description) {
    const note = await createNote(indexBox, description)
    setNewNote(note)
  }

  return <>
    <Header />
    <main className='board'>
      <BoardSection
        boxes={boxes.slice(0, 7)}
        className='board__top'
        notes={notes}
        onCreateNewNote={handleCreateNote}
      />
      <BoardSection
        boxes={boxes.slice(7, 9)}
        className='board__bottom'
        notes={notes}
        onCreateNewNote={handleCreateNote}
      />
    </main>
  </>
}
