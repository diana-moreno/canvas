import React, {useState, useEffect} from 'react'
import './index.sass'
import Header from '../Header'
import BoardSection from '../BoardSection'
import Modal from '../Modal'
import constants from './constants.js'
import logic from '../../logic'
const { boxes, boardSections } = constants
const { listNotes, createNote, editNote, deleteNote } = logic

export default function () {
  const [notes, setNotes] = useState()
  const [update, setUpdate] = useState(false)
  const [error, setError] = useState()
  const [isHintMode, setIsHintMode] = useState(false)
  const [title, setTitle] = useState()
  const [hint, setHint] = useState()

  useEffect(() => {
    (async () => {
      try {
        const notes = await listNotes()
        setNotes(notes)
      } catch({ message }) {
        setError(message)
      }
      setUpdate(false)
    })()
  }, [update])

  async function handleCreateNote(indexBox, description) {
    try {
      await createNote(indexBox, description)
    } catch({ message }) {
      setError(message)
    }
    setUpdate(true)
  }

  async function handleEditNote(id, description) {
    try {
      await editNote(id, description)
    } catch({ message }) {
      setError(message)
    }
    setUpdate(true)
  }

  async function handleDeleteNote(id) {
    try {
      await deleteNote(id)
    } catch({ message }) {
      setError(message)
    }
    setUpdate(true)
  }

  function handleBack() {
    setError(null)
    setIsHintMode(false)
  }

  function enableHintMode(indexBox) {
    setIsHintMode(true)
    const title = boxes[indexBox].title
    const hint = boxes[indexBox].hint
    setTitle(title)
    setHint(hint)
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
            error={error}
            enableHintMode={enableHintMode}
          />
        })
      }
      { error && <Modal error={error} onBack={handleBack} /> }
      { isHintMode && <Modal title={title} hint={hint} onBack={handleBack} /> }
    </main>
  </>
}
