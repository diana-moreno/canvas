import React, {useState, useEffect, useRef } from 'react'

export default function({ group, description, id, onEditNote, onDeleteNote }) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [newDescription, setNewDescription] = useState()

  useEffect(() => {
    // active focus when is a new note
    isEditMode && wrapperRef.current.focus()
    setNewDescription(description)
  }, [isEditMode])

  function enableEditNoteMode() {
    setIsEditMode(true)
  }

/*  function disableCreateNoteMode() {
    setIsNewNote(false)
    setDescription(null)
  }*/

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      description !== newDescription && onEditNote(id, newDescription)
      setIsEditMode(false)
    }
  }

  function useOutside(ref) {
    function handleClickOutside(event) {
      if (ref.current
        && !ref.current.contains(event.target)
        && event.target.getAttribute('name') !== 'delete'
      ){
        description !== newDescription && onEditNote(id, newDescription)
        setIsEditMode(false)
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
    { !isEditMode && <li
      className={`item item--${group} item--big`}
      onClick={() => enableEditNoteMode()}
    >
      {description}
    </li>
    }

    { isEditMode &&
      <li className={`item item__edit`}>
        <input
          type='text'
          className='item__input'
          value={newDescription}
          onKeyDown={handleKeyDown}
          onChange={(event) => setNewDescription(event.target.value)}
          ref={wrapperRef}
        />
        <i
          name='delete'
          className='material-icons item__delete'
          onClick={() => {
            onDeleteNote(id)
            setIsEditMode(false)
          }}
        >clear</i>
      </li>
    }
  </>
}
