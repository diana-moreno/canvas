import React from 'react'
import './index.sass'
import constants from '../Board/constants.js'
const { boxes } = constants

export default function({ error, indexBox, onBack }) {
  const title = boxes[indexBox].title
  const hint = boxes[indexBox].hint

  return (
    <section className="modal">
      <div className='modal__container'>
        <div className={ error ? 'modal__error' : 'modal__hint'}>
          { error && <p>Ups! Something went wrong.</p> }
          { indexBox && <h3>{title}</h3> }
          <p>{error || hint}</p>
        </div>
        <button
          className='modal__button'
          onClick={onBack}
        >Ok</button>
      </div>
    </section>
  )
}