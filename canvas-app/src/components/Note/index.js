import React, {useState, useEffect, useRef } from 'react'

export default function({ group, description, id, onEditNote, onDeleteNote }) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [newDescription, setNewDescription] = useState(description)

  useEffect(() => {
    // active focus when is editing a note
    isEditMode && ref.current.focus()
  }, [isEditMode])

  function enableEditNoteMode() {
    setIsEditMode(true)
  }

  function disableEditNoteMode() {
    setIsEditMode(false)
  }

  function handleDeleteNote() {
    onDeleteNote(id)
    disableEditNoteMode()
  }

  function handleEditNote() {
    description !== newDescription && onEditNote(id, newDescription)
  }

  function editDescription(event) {
    setNewDescription(event.target.value)
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleEditNote()
      disableEditNoteMode()
    }
  }

  function useOutside(ref) {
    function handleClickOutside(event) {
      if (ref.current
        && !ref.current.contains(event.target)
        && event.target.getAttribute('name') !== 'delete'
      ){
        handleEditNote()
        disableEditNoteMode()
      }
    }
    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    })
  }

  const ref = useRef(null)
  useOutside(ref)

  return <>
    { !isEditMode &&
      <li
        className={`item item--${group} item--big`}
        onClick={() => enableEditNoteMode()}
      >
        {newDescription}
      </li>
    }

    { isEditMode &&
      <li className={`item item__edit`}>
        <input
          type='text'
          className='item__input'
          value={newDescription}
          onKeyDown={handleKeyDown}
          onChange={editDescription}
          ref={ref}
        />
        <i
          name='delete'
          className='material-icons item__delete'
          onClick={handleDeleteNote}
        >
          clear
        </i>
      </li>
    }
  </>
}
