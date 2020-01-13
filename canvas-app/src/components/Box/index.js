import React, {useState, useEffect, useRef} from 'react'
import './index.sass'
import Note from '../Note'

export default function ({ indexBox, title, icon, group, hint, notes, onCreateNewNote, onEditNote, onDeleteNote }) {
  const [isNewNote, setIsNewNote] = useState(false)
  const [description, setDescription] = useState(null)


  useEffect(() => {
    // active focus when is a new note
    isNewNote && wrapperRef.current.focus()
  }, [isNewNote])

  function enableCreateNoteMode() {
    setIsNewNote(true)
  }

  function disableCreateNoteMode() {
    setIsNewNote(false)
    setDescription(null)
  }

  function handleCreateNote(event) {
    const description = event.target.value
    setDescription(description)
  }

  async function handleKeyDown(event) {
    if (event.key === 'Enter' && description) {
      onCreateNewNote(indexBox, description)
      disableCreateNoteMode()
    }
  }

  function useOutside(ref) {
    async function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (description) {
          onCreateNewNote(indexBox, description)
          disableCreateNoteMode()
        } else {
          setIsNewNote(false)
        }
      }
    }
    useEffect(() => {
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up (componentDidUnmount)
        document.removeEventListener("mousedown", handleClickOutside);
      }
    })
  }

  const wrapperRef = useRef(null)
  useOutside(wrapperRef)

  return <>
    <div className={`box box-${indexBox}`}>
      <div className='box__title'>
        <i className="material-icons">{icon}</i>
        <h3>{title}</h3>
        <i title={hint} className="material-icons box__help">help_outline</i>
      </div>
      <div className='box__content'>
        <ul className='box__list-items'>
          { isNewNote &&
            <li className={`item item__new`}>
              <input
                type='text'
                className='item__input'
                placeholder='add new note...'
                onChange={handleCreateNote}
                ref={wrapperRef}
                onKeyDown={handleKeyDown}
              />
            </li>
          }
          { notes && notes.map(note => {
              const { description, _id: id} = note
              return <Note
                group={group}
                description={description}
                key={id}
                id={id}
                onEditNote={onEditNote}
                onDeleteNote={onDeleteNote}
              />
            })
          }
        </ul>
      </div>
      <button className='box__button-add' onClick={enableCreateNoteMode}>
        <i className="material-icons">add_circle_outline</i>
      </button>
    </div>
  </>
}
