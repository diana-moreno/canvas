import React, {useState, useEffect} from 'react'
import './index.sass'
import Header from '../Header'
import BoardSection from '../BoardSection'
import constants from './constants.js'
import logic from '../../logic'
const { boxes, boardSections } = constants
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
      { boardSections.map(section => {
        const { position, startIndex, endIndex } = section
          return <BoardSection
            boxes={boxes.slice(startIndex, endIndex)}
            className={`board__${position}`}
            notes={notes}
            onCreateNewNote={handleCreateNote}
            key={position}
          />
        })
      }
    </main>
  </>
}
