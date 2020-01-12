import React, {useState, useEffect, useRef} from 'react'
import './index.sass'
import Header from '../Header'

export default function ({ indexBox, title, icon, group, hint }) {
  const [isNewNote, setIsNewNote] = useState(false)
  const [description, setDescription] = useState(null)

  useEffect(() => {
    setDescription(null)
    isNewNote && wrapperRef.current.focus()
  }, [isNewNote])

  function enableCreateNoteMode() {
    setIsNewNote(true)
  }

  function handleCreateNote(event) {
    const description = event.target.value
    setDescription(description)
  }

  function useOutsideAlerter(ref) {
    async function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        !description && setIsNewNote(false)
/*        if (note) {
          const newNote = await createNote(description, indexBox)
          onCreateNewNote(newNote, group, indexBox)
        }*/
        setIsNewNote(false)
        setDescription(null)
      }
    }
    useEffect(() => {
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up (componentDidUnmount)
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

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
          <li className={`item item-${group} item_new`}>
            <input
              type='text'
              className='item__input'
              placeholder='add new note...'
              onChange={handleCreateNote}
              ref={wrapperRef}
            />
          </li>
        }
         <li className={`item item--${group}`}>Example key 1</li>
          <li className={`item item--${group}`}>Example key 2</li>
          <li className={`item item--${group}`}>Example key 3</li>
          <li className={`item item--${group}`}>Example key 4</li>
          <li className={`item item--${group}`}>Example key 5</li>
          <li className={`item item--${group}`}>Example key 6</li>
        </ul>
      </div>
      <button className='box__button-add' onClick={() => enableCreateNoteMode()}>
        <i className="material-icons">add_circle_outline</i>
      </button>
    </div>
  </>
}


